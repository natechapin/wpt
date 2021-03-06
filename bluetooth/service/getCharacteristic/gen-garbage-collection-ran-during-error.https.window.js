// META: script=/resources/testharness.js
// META: script=/resources/testharnessreport.js
// META: script=/resources/testdriver.js
// META: script=/resources/testdriver-vendor.js
// META: script=/bluetooth/resources/bluetooth-helpers.js
// Generated by //third_party/WebKit/LayoutTests/bluetooth/generate.py
'use strict';
const test_desc = 'Garbage Collection ran during getCharacteristic ' +
    'call that fails. Should not crash';
const expected = new DOMException(
    'GATT Server is disconnected. Cannot retrieve characteristics. ' +
        '(Re)connect first with `device.gatt.connect`.',
    'NetworkError');
let promise;

bluetooth_test(
    () => getHealthThermometerService()
              .then(({service}) => {
                promise = assert_promise_rejects_with_message(
                    service.getCharacteristic('measurement_interval'),
                    expected);
                // Disconnect called to clear attributeInstanceMap and allow the
                // object to get garbage collected.
                service.device.gatt.disconnect();
              })
              .then(runGarbageCollection)
              .then(() => promise),
    test_desc);
