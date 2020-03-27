/* globals document */
import {createAutocomplete} from './autocomplete';
import jsdom from '../../../node_modules/jsdom';

const {JSDOM} = jsdom;

describe('autoComplete', () => {
    describe('Helper functions', () => {
        const dom = new JSDOM(
            `<!DOCTYPE html>
            <html>
                <body>
                    <label for="dropdown-menu">Dropdown</label>
                    <select id="dropdown-menu" class="govuk-dropdown">
                        <option value="101">Item 1</option>
                        <option value="102">Item 2</option>
                        <option value="103">Item 3</option>
                        <option value="104">Item 4</option>
                        <option value="105">Item 5</option>
                    </select>
                </body>
            </html>`
        );
        const autoComplete = createAutocomplete(dom.window);
        describe('inputValueTemplate', () => {
            it('Should return the name given a valid result', () => {
                const result = {name: 'result-name', value: 10001};

                const actual = autoComplete.inputValueTemplate(result);
                expect(actual).toEqual('result-name');
            });
            it('Should return the object if it is already a string', () => {
                const result = 'result-name';

                const actual = autoComplete.inputValueTemplate(result);
                expect(actual).toEqual('result-name');
            });
        });

        describe('suggestionTemplate', () => {
            it('Should return a string containing the name given a valid result', () => {
                const result = {name: 'result-name', value: 10001};

                const actual = autoComplete.suggestionTemplate(result);
                expect(actual).toEqual(`<strong>result-name</strong>`);
            });
            it('Should return the object if it is already a string', () => {
                const result = 'result-name';

                const actual = autoComplete.suggestionTemplate(result);
                expect(actual).toEqual(`<strong>result-name</strong>`);
            });
        });

        describe('htmlCollectionToArray', () => {
            it('Should transform an array-like collection of HTMLElements into an array', () => {
                const selectElement = dom.window.document.querySelector('#dropdown-menu');

                const actual = autoComplete.htmlCollectionToArray(selectElement);
                expect(typeof actual).toBeDefined();
                expect(typeof actual).toEqual('object');
                expect(actual.length).toEqual(5);
            });
        });

        describe('formatResults', () => {
            it('Should transform an array of option elements to an array of result objects', () => {
                const selectElement = dom.window.document.querySelector('#dropdown-menu');
                const resultArray = autoComplete.htmlCollectionToArray(selectElement);

                const actual = autoComplete.formatResults(resultArray);
                expect(typeof actual).toBeDefined();
                expect(typeof actual).toEqual('object');
                expect(actual.length).toEqual(5);
                expect(actual).toContainEqual({code: '101', name: 'Item 1'});
                expect(actual).toContainEqual({code: '102', name: 'Item 2'});
                expect(actual).toContainEqual({code: '103', name: 'Item 3'});
                expect(actual).toContainEqual({code: '104', name: 'Item 4'});
                expect(actual).toContainEqual({code: '105', name: 'Item 5'});
            });
        });

        describe('filterResults', () => {
            it('Should filter the results given a string matching the name', () => {
                const query = 'fir';
                const results = [
                    {code: '', name: 'Blank'},
                    {code: 'abc', name: 'first item'},
                    {code: 'def', name: 'second item'}
                ];

                const actual = autoComplete.filterResults(query, results);

                expect(actual).toContainEqual({code: 'abc', name: 'first item'});
            });
            it('Should not allow the sure to search for the default option', () => {
                const query = 'Bla';
                const results = [
                    {code: '', name: 'Blank'},
                    {code: 'abc', name: 'Item 1'},
                    {code: 'def', name: 'Item 2'}
                ];
                const expected = [];
                const actual = autoComplete.filterResults(query, results);

                expect(actual).toEqual(expected);
            });
            it('return an empty array if no query is entered', () => {
                const query = undefined;
                const results = [
                    {code: '', name: 'Blank'},
                    {code: 'abc', name: 'Item 1'},
                    {code: 'def', name: 'Item 2'}
                ];
                const expected = [];
                const actual = autoComplete.filterResults(query, results);

                expect(actual).toEqual(expected);
            });
        });
    });

    /* describe('init', () => {
        const options = {
            runScripts: 'dangerously',
            resources: 'usable'
        };
        let autoComplete;

        it('should', async () => {
            const dom = await JSDOM.fromFile(
                './src/modules/autocomplete/autocomplete.test.html',
                options
            );
            autoComplete = createAutocomplete(dom.window);

            const selectElement = dom.window.document.querySelector('#dropdown-menu');

            autoComplete.init(selectElement);

            console.log(selectElement);
            expect(typeof selectElement).toEqual('string');
        });

        it('should do', async () => {
            const dom = await JSDOM.fromFile(
                './src/modules/autocomplete/autocomplete.test.html',
                options
            );
            autoComplete = createAutocomplete(dom.window);

            const selectElement = '#dropdown-menu';

            autoComplete.init(selectElement);

            console.log(selectElement);
            expect(typeof selectElement).toEqual('string');
        });
    }); */
});
