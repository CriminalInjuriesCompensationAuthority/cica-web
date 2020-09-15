import _extends from '@babel/runtime/helpers/esm/extends';
import resolvePathname from 'resolve-pathname';
import valueEqual from 'value-equal';
import warning from 'tiny-warning';
import invariant from 'tiny-invariant';

function addLeadingSlash(path) {
    return path.charAt(0) === '/' ? path : `/${path}`;
}
function stripLeadingSlash(path) {
    return path.charAt(0) === '/' ? path.substr(1) : path;
}
function hasBasename(path, prefix) {
    return (
        path.toLowerCase().indexOf(prefix.toLowerCase()) === 0 &&
        '/?#'.indexOf(path.charAt(prefix.length)) !== -1
    );
}
function stripBasename(path, prefix) {
    return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
}
function stripTrailingSlash(path) {
    return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
}
function parsePath(path) {
    let pathname = path || '/';
    let search = '';
    let hash = '';
    const hashIndex = pathname.indexOf('#');

    if (hashIndex !== -1) {
        hash = pathname.substr(hashIndex);
        pathname = pathname.substr(0, hashIndex);
    }

    const searchIndex = pathname.indexOf('?');

    if (searchIndex !== -1) {
        search = pathname.substr(searchIndex);
        pathname = pathname.substr(0, searchIndex);
    }

    return {
        pathname,
        search: search === '?' ? '' : search,
        hash: hash === '#' ? '' : hash
    };
}
function createPath(location) {
    const {pathname} = location;
    const {search} = location;
    const {hash} = location;
    let path = pathname || '/';
    if (search && search !== '?') {
        path += search.charAt(0) === '?' ? search : `?${search}`;
    }
    if (hash && hash !== '#') {
        path += hash.charAt(0) === '#' ? hash : `#${hash}`;
    }
    return path;
}

function createLocation(path, state, key, currentLocation) {
    let location;

    if (typeof path === 'string') {
        // Two-arg form: push(path, state)
        location = parsePath(path);
        location.state = state;
    } else {
        // One-arg form: push(location)
        location = _extends({}, path);
        if (location.pathname === undefined) {
            location.pathname = '';
        }

        if (location.search) {
            if (location.search.charAt(0) !== '?') {
                location.search = `?${location.search}`;
            }
        } else {
            location.search = '';
        }

        if (location.hash) {
            if (location.hash.charAt(0) !== '#') {
                location.hash = `#${location.hash}`;
            }
        } else {
            location.hash = '';
        }

        if (state !== undefined && location.state === undefined) {
            location.state = state;
        }
    }

    try {
        location.pathname = decodeURI(location.pathname);
    } catch (e) {
        if (e instanceof URIError) {
            throw new URIError(
                `Pathname "${location.pathname}" could not be decoded. ` +
                    `This is likely caused by an invalid percent-encoding.`
            );
        } else {
            throw e;
        }
    }

    if (key) {
        location.key = key;
    }

    if (currentLocation) {
        // Resolve incomplete/relative pathname relative to current location.
        if (!location.pathname) {
            location.pathname = currentLocation.pathname;
        } else if (location.pathname.charAt(0) !== '/') {
            location.pathname = resolvePathname(location.pathname, currentLocation.pathname);
        }
    } else {
        // When there is no prior location and pathname is empty, set it to /
        if (!location.pathname) {
            location.pathname = '/';
        }
    }

    return location;
}
function locationsAreEqual(a, b) {
    return (
        a.pathname === b.pathname &&
        a.search === b.search &&
        a.hash === b.hash &&
        a.key === b.key &&
        valueEqual(a.state, b.state)
    );
}

function createTransitionManager() {
    let prompt = null;

    function setPrompt(nextPrompt) {
        process.env.NODE_ENV !== 'production'
            ? warning(prompt == null, 'A history supports only one prompt at a time')
            : void 0;
        prompt = nextPrompt;
        return function() {
            if (prompt === nextPrompt) {
                prompt = null;
            }
        };
    }

    function confirmTransitionTo(location, action, getUserConfirmation, callback) {
        // TODO: If another transition starts while we're still confirming
        // the previous one, we may end up in a weird state. Figure out the
        // best way to handle this.
        if (prompt != null) {
            const result = typeof prompt === 'function' ? prompt(location, action) : prompt;

            if (typeof result === 'string') {
                if (typeof getUserConfirmation === 'function') {
                    getUserConfirmation(result, callback);
                } else {
                    process.env.NODE_ENV !== 'production'
                        ? warning(
                              false,
                              'A history needs a getUserConfirmation function in order to use a prompt message'
                          )
                        : void 0;
                    callback(true);
                }
            } else {
                // Return false from a transition hook to cancel the transition.
                callback(result !== false);
            }
        } else {
            callback(true);
        }
    }

    let listeners = [];

    function appendListener(fn) {
        let isActive = true;

        function listener() {
            if (isActive) {
                fn.apply(void 0, arguments);
            }
        }

        listeners.push(listener);
        return function() {
            isActive = false;
            listeners = listeners.filter(function(item) {
                return item !== listener;
            });
        };
    }

    function notifyListeners() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        listeners.forEach(function(listener) {
            return listener.apply(void 0, args);
        });
    }

    return {
        setPrompt,
        confirmTransitionTo,
        appendListener,
        notifyListeners
    };
}

const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);
function getConfirmation(message, callback) {
    callback(window.confirm(message)); // eslint-disable-line no-alert
}
/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */

function supportsHistory() {
    const ua = window.navigator.userAgent;
    if (
        (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
        ua.indexOf('Mobile Safari') !== -1 &&
        ua.indexOf('Chrome') === -1 &&
        ua.indexOf('Windows Phone') === -1
    ) {
        return false;
    }
    return window.history && 'pushState' in window.history;
}
/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */

function supportsPopStateOnHashChange() {
    return window.navigator.userAgent.indexOf('Trident') === -1;
}
/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */

function supportsGoWithoutReloadUsingHash() {
    return window.navigator.userAgent.indexOf('Firefox') === -1;
}
/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */

function isExtraneousPopstateEvent(event) {
    return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
}

const PopStateEvent = 'popstate';
const HashChangeEvent = 'hashchange';

function getHistoryState() {
    try {
        return window.history.state || {};
    } catch (e) {
        // IE 11 sometimes throws when accessing window.history.state
        // See https://github.com/ReactTraining/history/pull/289
        return {};
    }
}
/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */

function createBrowserHistory(props) {
    if (props === void 0) {
        props = {};
    }

    !canUseDOM
        ? process.env.NODE_ENV !== 'production'
            ? invariant(false, 'Browser history needs a DOM')
            : invariant(false)
        : void 0;
    const globalHistory = window.history;
    const canUseHistory = supportsHistory();
    const needsHashChangeListener = !supportsPopStateOnHashChange();
    const _props = props;
    const _props$forceRefresh = _props.forceRefresh;
    const forceRefresh = _props$forceRefresh === void 0 ? false : _props$forceRefresh;
    const _props$getUserConfirm = _props.getUserConfirmation;
    const getUserConfirmation =
        _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm;
    const _props$keyLength = _props.keyLength;
    const keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
    const basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';

    function getDOMLocation(historyState) {
        const _ref = historyState || {};
        const {key} = _ref;
        const {state} = _ref;

        const _window$location = window.location;
        const {pathname} = _window$location;
        const {search} = _window$location;
        const {hash} = _window$location;
        let path = pathname + search + hash;
        process.env.NODE_ENV !== 'production'
            ? warning(
                  !basename || hasBasename(path, basename),
                  `${'You are attempting to use a basename on a page whose URL path does not begin ' +
                      'with the basename. Expected path "'}${path}" to begin with "${basename}".`
              )
            : void 0;
        if (basename) {
            path = stripBasename(path, basename);
        }
        return createLocation(path, state, key);
    }

    function createKey() {
        return Math.random()
            .toString(36)
            .substr(2, keyLength);
    }

    const transitionManager = createTransitionManager();

    function setState(nextState) {
        _extends(history, nextState);

        history.length = globalHistory.length;
        transitionManager.notifyListeners(history.location, history.action);
    }

    function handlePopState(event) {
        // Ignore extraneous popstate events in WebKit.
        if (isExtraneousPopstateEvent(event)) {
            return;
        }
        handlePop(getDOMLocation(event.state));
    }

    function handleHashChange() {
        handlePop(getDOMLocation(getHistoryState()));
    }

    let forceNextPop = false;

    function handlePop(location) {
        if (forceNextPop) {
            forceNextPop = false;
            setState();
        } else {
            const action = 'POP';
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(
                ok
            ) {
                if (ok) {
                    setState({
                        action,
                        location
                    });
                } else {
                    revertPop(location);
                }
            });
        }
    }

    function revertPop(fromLocation) {
        const toLocation = history.location; // TODO: We could probably make this more reliable by
        // keeping a list of keys we've seen in sessionStorage.
        // Instead, we just default to 0 for keys we don't know.

        let toIndex = allKeys.indexOf(toLocation.key);
        if (toIndex === -1) {
            toIndex = 0;
        }
        let fromIndex = allKeys.indexOf(fromLocation.key);
        if (fromIndex === -1) {
            fromIndex = 0;
        }
        const delta = toIndex - fromIndex;

        if (delta) {
            forceNextPop = true;
            go(delta);
        }
    }

    const initialLocation = getDOMLocation(getHistoryState());
    var allKeys = [initialLocation.key]; // Public interface

    function createHref(location) {
        return basename + createPath(location);
    }

    function push(path, state) {
        process.env.NODE_ENV !== 'production'
            ? warning(
                  !(typeof path === 'object' && path.state !== undefined && state !== undefined),
                  'You should avoid providing a 2nd state argument to push when the 1st ' +
                      'argument is a location-like object that already has state; it is ignored'
              )
            : void 0;
        const action = 'PUSH';
        const location = createLocation(path, state, createKey(), history.location);
        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
            if (!ok) {
                return;
            }
            const href = createHref(location);
            const {key} = location;
            const {state} = location;

            if (canUseHistory) {
                globalHistory.pushState(
                    {
                        key,
                        state
                    },
                    null,
                    href
                );

                if (forceRefresh) {
                    window.location.href = href;
                } else {
                    const prevIndex = allKeys.indexOf(history.location.key);
                    const nextKeys = allKeys.slice(0, prevIndex + 1);
                    nextKeys.push(location.key);
                    allKeys = nextKeys;
                    setState({
                        action,
                        location
                    });
                }
            } else {
                process.env.NODE_ENV !== 'production'
                    ? warning(
                          state === undefined,
                          'Browser history cannot push state in browsers that do not support HTML5 history'
                      )
                    : void 0;
                window.location.href = href;
            }
        });
    }

    function replace(path, state) {
        process.env.NODE_ENV !== 'production'
            ? warning(
                  !(typeof path === 'object' && path.state !== undefined && state !== undefined),
                  'You should avoid providing a 2nd state argument to replace when the 1st ' +
                      'argument is a location-like object that already has state; it is ignored'
              )
            : void 0;
        const action = 'REPLACE';
        const location = createLocation(path, state, createKey(), history.location);
        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
            if (!ok) {
                return;
            }
            const href = createHref(location);
            const {key} = location;
            const {state} = location;

            if (canUseHistory) {
                globalHistory.replaceState(
                    {
                        key,
                        state
                    },
                    null,
                    href
                );

                if (forceRefresh) {
                    window.location.replace(href);
                } else {
                    const prevIndex = allKeys.indexOf(history.location.key);
                    if (prevIndex !== -1) {
                        allKeys[prevIndex] = location.key;
                    }
                    setState({
                        action,
                        location
                    });
                }
            } else {
                process.env.NODE_ENV !== 'production'
                    ? warning(
                          state === undefined,
                          'Browser history cannot replace state in browsers that do not support HTML5 history'
                      )
                    : void 0;
                window.location.replace(href);
            }
        });
    }

    function go(n) {
        globalHistory.go(n);
    }

    function goBack() {
        go(-1);
    }

    function goForward() {
        go(1);
    }

    let listenerCount = 0;

    function checkDOMListeners(delta) {
        listenerCount += delta;

        if (listenerCount === 1 && delta === 1) {
            window.addEventListener(PopStateEvent, handlePopState);
            if (needsHashChangeListener) {
                window.addEventListener(HashChangeEvent, handleHashChange);
            }
        } else if (listenerCount === 0) {
            window.removeEventListener(PopStateEvent, handlePopState);
            if (needsHashChangeListener) {
                window.removeEventListener(HashChangeEvent, handleHashChange);
            }
        }
    }

    let isBlocked = false;

    function block(prompt) {
        if (prompt === void 0) {
            prompt = false;
        }

        const unblock = transitionManager.setPrompt(prompt);

        if (!isBlocked) {
            checkDOMListeners(1);
            isBlocked = true;
        }

        return function() {
            if (isBlocked) {
                isBlocked = false;
                checkDOMListeners(-1);
            }

            return unblock();
        };
    }

    function listen(listener) {
        const unlisten = transitionManager.appendListener(listener);
        checkDOMListeners(1);
        return function() {
            checkDOMListeners(-1);
            unlisten();
        };
    }

    var history = {
        length: globalHistory.length,
        action: 'POP',
        location: initialLocation,
        createHref,
        push,
        replace,
        go,
        goBack,
        goForward,
        block,
        listen
    };
    return history;
}

const HashChangeEvent$1 = 'hashchange';
const HashPathCoders = {
    hashbang: {
        encodePath: function encodePath(path) {
            return path.charAt(0) === '!' ? path : `!/${stripLeadingSlash(path)}`;
        },
        decodePath: function decodePath(path) {
            return path.charAt(0) === '!' ? path.substr(1) : path;
        }
    },
    noslash: {
        encodePath: stripLeadingSlash,
        decodePath: addLeadingSlash
    },
    slash: {
        encodePath: addLeadingSlash,
        decodePath: addLeadingSlash
    }
};

function stripHash(url) {
    const hashIndex = url.indexOf('#');
    return hashIndex === -1 ? url : url.slice(0, hashIndex);
}

function getHashPath() {
    // We can't use window.location.hash here because it's not
    // consistent across browsers - Firefox will pre-decode it!
    const {href} = window.location;
    const hashIndex = href.indexOf('#');
    return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
}

function pushHashPath(path) {
    window.location.hash = path;
}

function replaceHashPath(path) {
    window.location.replace(`${stripHash(window.location.href)}#${path}`);
}

function createHashHistory(props) {
    if (props === void 0) {
        props = {};
    }

    !canUseDOM
        ? process.env.NODE_ENV !== 'production'
            ? invariant(false, 'Hash history needs a DOM')
            : invariant(false)
        : void 0;
    const globalHistory = window.history;
    const canGoWithoutReload = supportsGoWithoutReloadUsingHash();
    const _props = props;
    const _props$getUserConfirm = _props.getUserConfirmation;
    const getUserConfirmation =
        _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm;
    const _props$hashType = _props.hashType;
    const hashType = _props$hashType === void 0 ? 'slash' : _props$hashType;
    const basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';
    const _HashPathCoders$hashT = HashPathCoders[hashType];
    const {encodePath} = _HashPathCoders$hashT;
    const {decodePath} = _HashPathCoders$hashT;

    function getDOMLocation() {
        let path = decodePath(getHashPath());
        process.env.NODE_ENV !== 'production'
            ? warning(
                  !basename || hasBasename(path, basename),
                  `${'You are attempting to use a basename on a page whose URL path does not begin ' +
                      'with the basename. Expected path "'}${path}" to begin with "${basename}".`
              )
            : void 0;
        if (basename) {
            path = stripBasename(path, basename);
        }
        return createLocation(path);
    }

    const transitionManager = createTransitionManager();

    function setState(nextState) {
        _extends(history, nextState);

        history.length = globalHistory.length;
        transitionManager.notifyListeners(history.location, history.action);
    }

    let forceNextPop = false;
    let ignorePath = null;

    function locationsAreEqual$$1(a, b) {
        return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash;
    }

    function handleHashChange() {
        const path = getHashPath();
        const encodedPath = encodePath(path);

        if (path !== encodedPath) {
            // Ensure we always have a properly-encoded hash.
            replaceHashPath(encodedPath);
        } else {
            const location = getDOMLocation();
            const prevLocation = history.location;
            if (!forceNextPop && locationsAreEqual$$1(prevLocation, location)) {
                return;
            } // A hashchange doesn't always == location change.

            if (ignorePath === createPath(location)) {
                return;
            } // Ignore this change; we already setState in push/replace.

            ignorePath = null;
            handlePop(location);
        }
    }

    function handlePop(location) {
        if (forceNextPop) {
            forceNextPop = false;
            setState();
        } else {
            const action = 'POP';
            transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(
                ok
            ) {
                if (ok) {
                    setState({
                        action,
                        location
                    });
                } else {
                    revertPop(location);
                }
            });
        }
    }

    function revertPop(fromLocation) {
        const toLocation = history.location; // TODO: We could probably make this more reliable by
        // keeping a list of paths we've seen in sessionStorage.
        // Instead, we just default to 0 for paths we don't know.

        let toIndex = allPaths.lastIndexOf(createPath(toLocation));
        if (toIndex === -1) {
            toIndex = 0;
        }
        let fromIndex = allPaths.lastIndexOf(createPath(fromLocation));
        if (fromIndex === -1) {
            fromIndex = 0;
        }
        const delta = toIndex - fromIndex;

        if (delta) {
            forceNextPop = true;
            go(delta);
        }
    } // Ensure the hash is encoded properly before doing anything else.

    const path = getHashPath();
    const encodedPath = encodePath(path);
    if (path !== encodedPath) {
        replaceHashPath(encodedPath);
    }
    const initialLocation = getDOMLocation();
    var allPaths = [createPath(initialLocation)]; // Public interface

    function createHref(location) {
        const baseTag = document.querySelector('base');
        let href = '';

        if (baseTag && baseTag.getAttribute('href')) {
            href = stripHash(window.location.href);
        }

        return `${href}#${encodePath(basename + createPath(location))}`;
    }

    function push(path, state) {
        process.env.NODE_ENV !== 'production'
            ? warning(state === undefined, 'Hash history cannot push state; it is ignored')
            : void 0;
        const action = 'PUSH';
        const location = createLocation(path, undefined, undefined, history.location);
        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
            if (!ok) {
                return;
            }
            const path = createPath(location);
            const encodedPath = encodePath(basename + path);
            const hashChanged = getHashPath() !== encodedPath;

            if (hashChanged) {
                // We cannot tell if a hashchange was caused by a PUSH, so we'd
                // rather setState here and ignore the hashchange. The caveat here
                // is that other hash histories in the page will consider it a POP.
                ignorePath = path;
                pushHashPath(encodedPath);
                const prevIndex = allPaths.lastIndexOf(createPath(history.location));
                const nextPaths = allPaths.slice(0, prevIndex + 1);
                nextPaths.push(path);
                allPaths = nextPaths;
                setState({
                    action,
                    location
                });
            } else {
                process.env.NODE_ENV !== 'production'
                    ? warning(
                          false,
                          'Hash history cannot PUSH the same path; a new entry will not be added to the history stack'
                      )
                    : void 0;
                setState();
            }
        });
    }

    function replace(path, state) {
        process.env.NODE_ENV !== 'production'
            ? warning(state === undefined, 'Hash history cannot replace state; it is ignored')
            : void 0;
        const action = 'REPLACE';
        const location = createLocation(path, undefined, undefined, history.location);
        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
            if (!ok) {
                return;
            }
            const path = createPath(location);
            const encodedPath = encodePath(basename + path);
            const hashChanged = getHashPath() !== encodedPath;

            if (hashChanged) {
                // We cannot tell if a hashchange was caused by a REPLACE, so we'd
                // rather setState here and ignore the hashchange. The caveat here
                // is that other hash histories in the page will consider it a POP.
                ignorePath = path;
                replaceHashPath(encodedPath);
            }

            const prevIndex = allPaths.indexOf(createPath(history.location));
            if (prevIndex !== -1) {
                allPaths[prevIndex] = path;
            }
            setState({
                action,
                location
            });
        });
    }

    function go(n) {
        process.env.NODE_ENV !== 'production'
            ? warning(
                  canGoWithoutReload,
                  'Hash history go(n) causes a full page reload in this browser'
              )
            : void 0;
        globalHistory.go(n);
    }

    function goBack() {
        go(-1);
    }

    function goForward() {
        go(1);
    }

    let listenerCount = 0;

    function checkDOMListeners(delta) {
        listenerCount += delta;

        if (listenerCount === 1 && delta === 1) {
            window.addEventListener(HashChangeEvent$1, handleHashChange);
        } else if (listenerCount === 0) {
            window.removeEventListener(HashChangeEvent$1, handleHashChange);
        }
    }

    let isBlocked = false;

    function block(prompt) {
        if (prompt === void 0) {
            prompt = false;
        }

        const unblock = transitionManager.setPrompt(prompt);

        if (!isBlocked) {
            checkDOMListeners(1);
            isBlocked = true;
        }

        return function() {
            if (isBlocked) {
                isBlocked = false;
                checkDOMListeners(-1);
            }

            return unblock();
        };
    }

    function listen(listener) {
        const unlisten = transitionManager.appendListener(listener);
        checkDOMListeners(1);
        return function() {
            checkDOMListeners(-1);
            unlisten();
        };
    }

    var history = {
        length: globalHistory.length,
        action: 'POP',
        location: initialLocation,
        createHref,
        push,
        replace,
        go,
        goBack,
        goForward,
        block,
        listen
    };
    return history;
}

function clamp(n, lowerBound, upperBound) {
    return Math.min(Math.max(n, lowerBound), upperBound);
}
/**
 * Creates a history object that stores locations in memory.
 */

function createMemoryHistory(props) {
    if (props === void 0) {
        props = {};
    }

    const _props = props;
    const {getUserConfirmation} = _props;
    const _props$initialEntries = _props.initialEntries;
    const initialEntries = _props$initialEntries === void 0 ? ['/'] : _props$initialEntries;
    const _props$initialIndex = _props.initialIndex;
    const initialIndex = _props$initialIndex === void 0 ? 0 : _props$initialIndex;
    const _props$keyLength = _props.keyLength;
    const keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
    const transitionManager = createTransitionManager();

    function setState(nextState) {
        _extends(history, nextState);

        history.length = history.entries.length;
        transitionManager.notifyListeners(history.location, history.action);
    }

    function createKey() {
        return Math.random()
            .toString(36)
            .substr(2, keyLength);
    }

    const index = clamp(initialIndex, 0, initialEntries.length - 1);
    const entries = initialEntries.map(function(entry) {
        return typeof entry === 'string'
            ? createLocation(entry, undefined, createKey())
            : createLocation(entry, undefined, entry.key || createKey());
    }); // Public interface

    const createHref = createPath;

    function push(path, state) {
        process.env.NODE_ENV !== 'production'
            ? warning(
                  !(typeof path === 'object' && path.state !== undefined && state !== undefined),
                  'You should avoid providing a 2nd state argument to push when the 1st ' +
                      'argument is a location-like object that already has state; it is ignored'
              )
            : void 0;
        const action = 'PUSH';
        const location = createLocation(path, state, createKey(), history.location);
        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
            if (!ok) {
                return;
            }
            const prevIndex = history.index;
            const nextIndex = prevIndex + 1;
            const nextEntries = history.entries.slice(0);

            if (nextEntries.length > nextIndex) {
                nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
            } else {
                nextEntries.push(location);
            }

            setState({
                action,
                location,
                index: nextIndex,
                entries: nextEntries
            });
        });
    }

    function replace(path, state) {
        process.env.NODE_ENV !== 'production'
            ? warning(
                  !(typeof path === 'object' && path.state !== undefined && state !== undefined),
                  'You should avoid providing a 2nd state argument to replace when the 1st ' +
                      'argument is a location-like object that already has state; it is ignored'
              )
            : void 0;
        const action = 'REPLACE';
        const location = createLocation(path, state, createKey(), history.location);
        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
            if (!ok) {
                return;
            }
            history.entries[history.index] = location;
            setState({
                action,
                location
            });
        });
    }

    function go(n) {
        const nextIndex = clamp(history.index + n, 0, history.entries.length - 1);
        const action = 'POP';
        const location = history.entries[nextIndex];
        transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function(ok) {
            if (ok) {
                setState({
                    action,
                    location,
                    index: nextIndex
                });
            } else {
                // Mimic the behavior of DOM histories by
                // causing a render after a cancelled POP.
                setState();
            }
        });
    }

    function goBack() {
        go(-1);
    }

    function goForward() {
        go(1);
    }

    function canGo(n) {
        const nextIndex = history.index + n;
        return nextIndex >= 0 && nextIndex < history.entries.length;
    }

    function block(prompt) {
        if (prompt === void 0) {
            prompt = false;
        }

        return transitionManager.setPrompt(prompt);
    }

    function listen(listener) {
        return transitionManager.appendListener(listener);
    }

    var history = {
        length: entries.length,
        action: 'POP',
        location: entries[index],
        index,
        entries,
        createHref,
        push,
        replace,
        go,
        goBack,
        goForward,
        canGo,
        block,
        listen
    };
    return history;
}

export {
    createBrowserHistory,
    createHashHistory,
    createMemoryHistory,
    createLocation,
    locationsAreEqual,
    parsePath,
    createPath
};
