'use strict';

jest.setTimeout(3000);
jest.testEnvironment = 'node';
process.env.CW_DCS_JWT = 'A massive string';
process.env.CW_COOKIE_SECRET = 'Also a huge string';
process.env.CW_DCS_URL = 'http://docker.for.win.localhost:3100';
process.env.CW_LIVECHAT_ALIVE = 'true';
process.env.CW_LIVECHAT_DISABLED = 'false';
process.env.CW_LIVECHAT_MAINTENANCE_MESSAGE_ENABLED = 'true';
process.env.CW_LIVECHAT_MAINTENANCE_MESSAGE = 'The live chat service will be unavailable';
process.env.CW_LIVECHAT_START_TIMES =
    '00:00:01.000,00:00:01.000,00:00:01.000,00:00:01.000,00:00:01.000,00:00:01.000,00:00:01.000';
process.env.CW_LIVECHAT_END_TIMES =
    '23:59:59.000,23:59:59.000,23:59:59.000,23:59:59.000,23:59:59.000,23:59:59.000,23:59:59.000';
process.env.CW_GOVUK_CLIENT_ID = 'thisisatestclientid';
process.env.CW_GOVUK_ISSUER_URL = 'http://www.issuer.com';
process.env.CW_NONCE_SIGNER = 'abcdefghijkmnolpqrstuvwxyzabcdef';
process.env.CW_URL = 'http://www.cw.com';
process.env.CW_GOVUK_PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIIEoQIBAAKCAQB0r/uxZkJiYCQIjxLioAou/L8EJCKOwRMFJlnMT8Wbbl15ISfv
0ejQPZ3JYffLB+MixLlrNeUGkvTG9kNLMeIkx8vcH5+SKBvP5dQkVyCwozQ7i9L9
nkL5y/rEoTKvyIYAVOZ04IGJpm/VtNGKwvNJgr2GTaW//wHaonlWKA4LmJrzbOme
AIjPo0LLrXyL2eOSbszmrPAm1Qxu0FUNf1BTvOj0RUajqoq88PsuOfbmIHizQUuF
ziPgErGRgFO/s/w6s2v6KStuod6dR11MoOE192zLmto9UmJvvWeaJ0/kj56AJKFI
4e/WIpuWIRGGIKJ2Cje95llwTCO8513LrB3FAgMBAAECggEAIYkOSg68l29QC9Gq
uM0MADMNZtBHykU9BSbfefOXNDOE07IuuyLVyTtcJKtuPsCWi8CEFYbYuonzpVbT
QkIk3zM4qJvCDYxPafGAha0wrPNKqK5nxhH857Oy713wpkp4EJJV5VM8h2X5EC82
Za3fo8naVEXuk/5i9wXo31UFrFkdDox4LL76IWwUAq3L6SAVJyg2pqmZ5dWzvNFB
bdQ1NpyfOzzB4J4QlPHc7jhb7QNfCNYs5WvW4d+QKAzf6ZyjaeHC2rnAXrQCWXSE
TSQjF+dXzOzG1JMHRjvhnXVsSUgDW+rfkyjJWcX3MZKoAMUY788+0lVbCVbAPunn
kILRgQKBgQCzIuza3YEfZb5CfxB/pN3HnyT28WSI+aFvrLiHqe8uj9GQUFUIRbbx
ral4zSC5rEjOQrkpgKkD+lLitLOy3iO6yWQsj8zqXvssA55Jn65zOxiYfuLlYkE7
MC6vSAhw9VidmDCso0NZtP785dOna7cbrOVnZKRh9t+cy7t0poJNIQKBgQCmwWgB
CPP9VymNShn0qrEpIYy1qnh4JY4OtD48gAPyQ8PnvGPd5se4mx5T/VhUdnUckP/h
KniyKW4RKwvigkcvq9HMvEvt36dV8+lJlcDpa1z25oqzCjR68Ufa1tDmDAL6tY08
gYPUvSd3fxa9oc/A+R6+TflhxASmuVyk5T/4JQKBgC5BBFt2+lI7GSdeW8o5rbJP
m2HP7p+XpWGKfZM6A7JIHFphA7PBHH3G042Hmb2XiK0JeXoH6JxIVIKJGiVDSoJ+
YclH0CdsIvq4bHSiMI88YRtvF/MWrbU0ubk0pklUcG8wztCkz00oePaf+UivfXY9
7HYH/JH3BsIbsOlr3RVBAoGABLen94+HR311wXd9MHy7skwurNz7t3pogGX89L0y
X2InYqDjul1S/Rf2Ta33F7yaJ4q6kmYfL/sYEAhFt8yzsteLgd050KrpEvdpfBlu
cawF3z46YkJBpdC5lalKE5f3ZZxJOJL5ZcVMHodL32V6eR0TD5MpIOjosMbBpjCO
FLkCgYBYBdfhZ7ZLwq8Y0bR0PJheAw9gResCL8eim5UpaPVpF39Bmf2Net/A7IhH
SwPm1QklH/B7kPa41awNZ1lmIQqCqqr9civRYDvQLdv2BToyoKyUk/strcCgHBi5
YgVE1b+1B0PafGbLT3IAjOCKvXZsCRRjE6dgi//L2MW3k1p0eQ==
-----END RSA PRIVATE KEY-----`;
