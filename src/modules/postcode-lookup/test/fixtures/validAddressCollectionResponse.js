const addressSearchThreeAddressesFoundResponse = {
    header: {
        uri: 'https://api.os.uk/search/places/v1/postcode?postcode=FO123BA',
        query: 'postcode=FO123BA',
        offset: 0,
        totalresults: 3,
        format: 'JSON',
        dataset: 'DPA',
        lr: 'EN,CY',
        maxresults: 100,
        epoch: '96',
        lastupdate: '2022-11-14',
        output_srs: 'EPSG:27700'
    },
    results: [
        {
            DPA: {
                UPRN: '64010696',
                UDPRN: '4511806',
                ADDRESS: '2, FOOR ROAD, LARBAR, FOOARTH, FO12 3BA',
                BUILDING_NUMBER: '2',
                THOROUGHFARE_NAME: 'FOOR ROAD',
                DEPENDENT_LOCALITY: 'LARBAR',
                POST_TOWN: 'FOOARTH',
                POSTCODE: 'FO12 3BA',
                RPC: '2',
                X_COORDINATE: 317858.45,
                Y_COORDINATE: 168570.44,
                STATUS: 'APPROVED',
                LOGICAL_STATUS_CODE: '1',
                CLASSIFICATION_CODE: 'RD03',
                CLASSIFICATION_CODE_DESCRIPTION: 'Semi-Detached',
                LOCAL_CUSTODIAN_CODE: 6950,
                LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'BALE OF FOOMORGBAR',
                COUNTRY_CODE: 'W',
                COUNTRY_CODE_DESCRIPTION: 'This record is within Wales',
                POSTAL_ADDRESS_CODE: 'D',
                POSTAL_ADDRESS_CODE_DESCRIPTION: 'A record which is linked to PAF',
                BLPU_STATE_CODE: '2',
                BLPU_STATE_CODE_DESCRIPTION: 'In use',
                TOPOGRAPHY_LAYER_TOID: 'osgb1000027159653',
                PARENT_UPRN: '64106104',
                LAST_UPDATE_DATE: '10/02/2016',
                ENTRY_DATE: '12/06/2006',
                BLPU_STATE_DATE: '26/10/2011',
                LANGUAGE: 'CY',
                MATCH: 1.0,
                MATCH_DESCRIPTION: 'EXACT',
                DELIVERY_POINT_SUFFIX: '1J'
            }
        },
        {
            DPA: {
                UPRN: '64010691',
                UDPRN: '4511798',
                ADDRESS: 'BARUFOO, FOOR ROAD, LARBAR, FOOARTH, FO12 3BA',
                BUILDING_NAME: 'BARUCH',
                THOROUGHFARE_NAME: 'FOOR ROAD',
                DEPENDENT_LOCALITY: 'LARBAR',
                POST_TOWN: 'FOOARTH',
                POSTCODE: 'FO12 3BA',
                RPC: '1',
                X_COORDINATE: 317792.98,
                Y_COORDINATE: 168625.79,
                STATUS: 'APPROVED',
                LOGICAL_STATUS_CODE: '1',
                CLASSIFICATION_CODE: 'RD02',
                CLASSIFICATION_CODE_DESCRIPTION: 'Detached',
                LOCAL_CUSTODIAN_CODE: 6950,
                LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'BALE OF FOOMORGBAR',
                COUNTRY_CODE: 'W',
                COUNTRY_CODE_DESCRIPTION: 'This record is within Wales',
                POSTAL_ADDRESS_CODE: 'D',
                POSTAL_ADDRESS_CODE_DESCRIPTION: 'A record which is linked to PAF',
                BLPU_STATE_CODE: '2',
                BLPU_STATE_CODE_DESCRIPTION: 'In use',
                TOPOGRAPHY_LAYER_TOID: 'osgb1000027159660',
                LAST_UPDATE_DATE: '23/09/2018',
                ENTRY_DATE: '12/06/2006',
                BLPU_STATE_DATE: '26/10/2011',
                LANGUAGE: 'CY',
                MATCH: 1.0,
                MATCH_DESCRIPTION: 'EXACT',
                DELIVERY_POINT_SUFFIX: '1A'
            }
        },
        {
            DPA: {
                UPRN: '64012070',
                UDPRN: '4511799',
                ADDRESS: 'CHURCH HOUSE, FOOR ROAD, LARBAR, FOOARTH, FO12 3BA',
                BUILDING_NAME: 'CHURCH HOUSE',
                THOROUGHFARE_NAME: 'FOOR ROAD',
                DEPENDENT_LOCALITY: 'LARBAR',
                POST_TOWN: 'FOOARTH',
                POSTCODE: 'FO12 3BA',
                RPC: '1',
                X_COORDINATE: 318614.58,
                Y_COORDINATE: 168237.1,
                STATUS: 'APPROVED',
                LOGICAL_STATUS_CODE: '1',
                CLASSIFICATION_CODE: 'RD02',
                CLASSIFICATION_CODE_DESCRIPTION: 'Detached',
                LOCAL_CUSTODIAN_CODE: 6950,
                LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'BALE OF FOOMORGBAR',
                COUNTRY_CODE: 'W',
                COUNTRY_CODE_DESCRIPTION: 'This record is within Wales',
                POSTAL_ADDRESS_CODE: 'D',
                POSTAL_ADDRESS_CODE_DESCRIPTION: 'A record which is linked to PAF',
                BLPU_STATE_CODE: '2',
                BLPU_STATE_CODE_DESCRIPTION: 'In use',
                TOPOGRAPHY_LAYER_TOID: 'osgb1000027206359',
                LAST_UPDATE_DATE: '10/02/2016',
                ENTRY_DATE: '12/06/2006',
                BLPU_STATE_DATE: '26/10/2011',
                LANGUAGE: 'CY',
                MATCH: 1.0,
                MATCH_DESCRIPTION: 'EXACT',
                DELIVERY_POINT_SUFFIX: '1B'
            }
        }
    ]
};

const addressSearchOneAddressFoundResponse = {
    header: {
        uri: 'https://api.os.uk/search/places/v1/postcode?postcode=FO123BA',
        query: 'postcode=FO123BA',
        offset: 0,
        totalresults: 1,
        format: 'JSON',
        dataset: 'DPA',
        lr: 'EN,CY',
        maxresults: 100,
        epoch: '96',
        lastupdate: '2022-11-14',
        output_srs: 'EPSG:27700'
    },
    results: [
        {
            DPA: {
                UPRN: '64010696',
                UDPRN: '4511806',
                ADDRESS: '2, FOOR ROAD, LARBAR, FOOARTH, FO12 3BA',
                BUILDING_NUMBER: '2',
                THOROUGHFARE_NAME: 'FOOR ROAD',
                DEPENDENT_LOCALITY: 'LARBAR',
                POST_TOWN: 'FOOARTH',
                POSTCODE: 'FO12 3BA',
                RPC: '2',
                X_COORDINATE: 317858.45,
                Y_COORDINATE: 168570.44,
                STATUS: 'APPROVED',
                LOGICAL_STATUS_CODE: '1',
                CLASSIFICATION_CODE: 'RD03',
                CLASSIFICATION_CODE_DESCRIPTION: 'Semi-Detached',
                LOCAL_CUSTODIAN_CODE: 6950,
                LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'BALE OF FOOMORGBAR',
                COUNTRY_CODE: 'W',
                COUNTRY_CODE_DESCRIPTION: 'This record is within Wales',
                POSTAL_ADDRESS_CODE: 'D',
                POSTAL_ADDRESS_CODE_DESCRIPTION: 'A record which is linked to PAF',
                BLPU_STATE_CODE: '2',
                BLPU_STATE_CODE_DESCRIPTION: 'In use',
                TOPOGRAPHY_LAYER_TOID: 'osgb1000027159653',
                PARENT_UPRN: '64106104',
                LAST_UPDATE_DATE: '10/02/2016',
                ENTRY_DATE: '12/06/2006',
                BLPU_STATE_DATE: '26/10/2011',
                LANGUAGE: 'CY',
                MATCH: 1.0,
                MATCH_DESCRIPTION: 'EXACT',
                DELIVERY_POINT_SUFFIX: '1J'
            }
        }
    ]
};

export {addressSearchThreeAddressesFoundResponse, addressSearchOneAddressFoundResponse};
