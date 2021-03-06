'use strict';

module.exports = {
    'p-applicant-have-you-applied-to-us-before': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-enter-your-previous-reference-number',
                'q-applicant-have-you-applied-to-us-before'
            ],
            outputOrder: ['q-applicant-have-you-applied-to-us-before'],
            properties: {
                'q-applicant-have-you-applied-to-us-before': {
                    // transformer: 'govukRadios',
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: true,
                                componentIds: ['q-enter-your-previous-reference-number']
                            }
                        ]
                    }
                },
                'q-enter-your-previous-reference-number': {
                    options: {
                        macroOptions: {
                            classes: 'govuk-input--width-20'
                        }
                    }
                }
            }
        }
    },
    'p-applicant-when-did-the-crime-start': {
        options: {
            properties: {
                'q-applicant-when-did-the-crime-start': {
                    options: {
                        dateParts: {
                            day: false,
                            month: true,
                            year: true
                        }
                    }
                }
            },
            outputOrder: [
                'q-applicant-when-did-the-crime-start',
                'i-dont-know-when-the-crime-started'
            ]
        }
    },
    'p-applicant-when-did-the-crime-stop': {
        options: {
            properties: {
                'q-applicant-when-did-the-crime-stop': {
                    options: {
                        dateParts: {
                            day: false,
                            month: true,
                            year: true
                        }
                    }
                }
            },
            outputOrder: [
                'q-applicant-when-did-the-crime-stop',
                'i-dont-know-when-the-crime-stopped'
            ]
        }
    },
    'p--check-your-answers': {
        options: {
            pageContext: 'summary'
        }
    },
    'p-applicant-enter-your-address': {
        options: {
            properties: {
                'q-applicant-building-and-street': {
                    options: {
                        macroOptions: {
                            classes: '',
                            autocomplete: 'address-line1'
                        }
                    }
                },
                'q-applicant-building-and-street-2': {
                    options: {
                        macroOptions: {
                            classes: '',
                            autocomplete: 'address-line2',
                            label: {
                                classes: 'govuk-visually-hidden'
                            }
                        }
                    }
                },
                'q-applicant-town-or-city': {
                    options: {
                        macroOptions: {
                            autocomplete: 'address-level2'
                        }
                    }
                },
                'q-applicant-county': {
                    options: {
                        macroOptions: {
                            autocomplete: 'address-level1'
                        }
                    }
                },
                'q-applicant-postcode': {
                    options: {
                        macroOptions: {
                            autocomplete: 'postal-code'
                        }
                    }
                }
            },
            outputOrder: [
                'q-applicant-building-and-street',
                'q-applicant-building-and-street-2',
                'q-applicant-town-or-city',
                'q-applicant-county',
                'q-applicant-postcode'
            ]
        }
    },
    'p--was-the-crime-reported-to-police': {
        options: {
            outputOrder: ['q--was-the-crime-reported-to-police', 'dont-know-if-crime-reported']
        }
    },
    'p-applicant-enter-your-name': {
        options: {
            outputOrder: ['q-applicant-title', 'q-applicant-first-name', 'q-applicant-last-name'],
            properties: {
                'q-applicant-title': {
                    options: {
                        macroOptions: {
                            autocomplete: 'honorific-prefix'
                        }
                    }
                },
                'q-applicant-first-name': {
                    options: {
                        macroOptions: {
                            autocomplete: 'given-name'
                        }
                    }
                },
                'q-applicant-last-name': {
                    options: {
                        macroOptions: {
                            autocomplete: 'family-name'
                        }
                    }
                }
            }
        }
    },
    'p-applicant-select-reasons-for-the-delay-in-making-your-application': {
        options: {
            outputOrder: [
                'q-applicant-select-reasons-for-the-delay-in-making-your-application',
                'q-applicant-explain-reason-for-delay-application'
            ]
        }
    },
    'p-applicant-select-reasons-for-the-delay-in-reporting-the-crime-to-police': {
        options: {
            outputOrder: [
                'q-applicant-select-reasons-for-the-delay-in-reporting-the-crime-to-police',
                'q-applicant-explain-reason-for-delay-reporting'
            ]
        }
    },
    'p-applicant-select-the-option-that-applies-to-you': {
        options: {
            outputOrder: ['applicant-your-choices', 'q-applicant-option'],
            properties: {
                'q-applicant-option': {
                    options: {
                        macroOptions: {
                            fieldset: {
                                legend: {
                                    classes: 'govuk-fieldset__legend--m'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    'p-applicant-when-did-the-crime-happen': {
        options: {
            outputOrder: ['q-applicant-when-did-the-crime-happen', 'when-did-the-crime-happen']
        }
    },
    'p-applicant-where-in-england-did-it-happen': {
        options: {
            outputOrder: [
                'q-applicant-english-town-or-city',
                'q-applicant-english-location',
                'additional-info-help-text'
            ]
        }
    },
    'p-applicant-where-in-wales-did-it-happen': {
        options: {
            outputOrder: [
                'q-applicant-welsh-town-or-city',
                'q-applicant-welsh-location',
                'additional-info-help-text'
            ]
        }
    },
    'p-applicant-where-in-scotland-did-it-happen': {
        options: {
            outputOrder: [
                'q-applicant-scottish-town-or-city',
                'q-applicant-scottish-location',
                'additional-info-help-text'
            ]
        }
    },
    'p--confirmation': {
        options: {
            pageContext: 'confirmation',
            showBackButton: false
        }
    },
    'p-applicant-you-cannot-get-compensation': {
        options: {
            buttonText: 'Continue anyway'
        }
    },
    'p--which-police-force-is-investigating-the-crime': {
        options: {
            properties: {
                'q-police-force-id': {
                    options: {
                        defaultItem: {
                            value: '',
                            text: 'Select police force'
                        }
                    }
                }
            },
            outputOrder: ['q-police-force-id', 'additional-info-help-text']
        }
    },
    'p-applicant-enter-your-email-address': {
        options: {
            properties: {
                'q-applicant-enter-your-email-address': {
                    options: {
                        macroOptions: {
                            autocomplete: 'email',
                            spellcheck: 'false'
                        }
                    }
                }
            }
        }
    },
    'p-applicant-enter-your-telephone-number': {
        options: {
            properties: {
                'q-applicant-enter-your-telephone-number': {
                    options: {
                        macroOptions: {
                            autocomplete: 'tel'
                        }
                    }
                }
            }
        }
    },
    'p-applicant-confirmation-method': {
        options: {
            transformOrder: [
                'q-applicant-enter-your-email-address',
                'q-applicant-enter-your-telephone-number',
                'q-applicant-confirmation-method'
            ],
            outputOrder: ['q-applicant-confirmation-method'],
            properties: {
                'q-applicant-confirmation-method': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'email',
                                componentIds: ['q-applicant-enter-your-email-address']
                            },
                            {
                                itemValue: 'text',
                                componentIds: ['q-applicant-enter-your-telephone-number']
                            }
                        ],
                        additionalMapping: [
                            {
                                itemType: 'divider',
                                itemValue: 'or',
                                itemIndex: 2
                            }
                        ]
                    }
                },
                'q-applicant-enter-your-email-address': {
                    options: {
                        macroOptions: {
                            classes: 'govuk-input--width-20',
                            autocomplete: 'email'
                        }
                    }
                },
                'q-applicant-enter-your-telephone-number': {
                    options: {
                        macroOptions: {
                            classes: 'govuk-input--width-20',
                            autocomplete: 'tel'
                        }
                    }
                }
            }
        }
    },
    'p-applicant-declaration': {
        options: {
            buttonText: 'Agree and submit',
            pageContext: 'submission'
        }
    },
    'p-applicant-select-treatments': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-other-treatment-dmi',
                'q-applicant-select-treatments-dmi'
            ],
            outputOrder: ['q-applicant-select-treatments-dmi'],
            properties: {
                'q-applicant-select-treatments-dmi': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'other',
                                componentIds: ['q-applicant-other-treatment-dmi']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-gp-enter-your-address': {
        options: {
            properties: {
                'q-gp-building-and-street': {
                    options: {
                        macroOptions: {
                            classes: ''
                        }
                    }
                },
                'q-gp-building-and-street2': {
                    options: {
                        macroOptions: {
                            classes: ''
                        }
                    }
                }
            },
            outputOrder: [
                'q-gp-building-and-street',
                'q-gp-building-and-street2',
                'q-gp-town-or-city',
                'q-gp-county',
                'q-gp-postcode'
            ]
        }
    },
    'p--whats-the-crime-reference-number': {
        options: {
            outputOrder: ['q--whats-the-crime-reference-number', 'i-dont-know-the-crime-reference']
        }
    },
    'p-applicant-treatment-address': {
        options: {
            properties: {
                'q-applicant-treatment-building-and-street': {
                    options: {
                        macroOptions: {
                            classes: ''
                        }
                    }
                },
                'q-applicant-treatment-building-and-street2': {
                    options: {
                        macroOptions: {
                            classes: ''
                        }
                    }
                }
            },
            outputOrder: [
                'q-applicant-treatment-building-and-street',
                'q-applicant-treatment-building-and-street2',
                'q-applicant-treatment-town-or-city',
                'q-applicant-treatment-county',
                'q-applicant-treatment-postcode'
            ]
        }
    },
    'p-applicant-work-details-option': {
        options: {
            transformOrder: ['q-applicant-work-details-other', 'q-applicant-work-details-option'],
            outputOrder: ['q-applicant-work-details-option'],
            properties: {
                'q-applicant-work-details-option': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'other',
                                componentIds: ['q-applicant-work-details-other']
                            }
                        ]
                    }
                },
                'q-applicant-work-details-other': {
                    options: {
                        macroOptions: {
                            classes: 'govuk-input--width-20'
                        }
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-upper-head': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-upper-head-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-upper-head-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-upper-face': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-upper-face-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-upper-face-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-upper-neck': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-upper-neck-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-upper-neck-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-upper-eye': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-upper-eye-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-upper-eye-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-upper-ear': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-upper-ear-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-upper-ear-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-upper-nose': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-upper-nose-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-upper-nose-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-upper-mouth': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-upper-mouth-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-upper-mouth-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-upper-skin': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-upper-skin-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-upper-skin-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-torso-shoulder': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-torso-shoulder-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-torso-shoulder-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-torso-chest': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-torso-chest-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-torso-chest-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-torso-abdomen': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-torso-abdomen-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-torso-abdomen-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-torso-back': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-torso-back-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-torso-back-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-torso-pelvis': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-torso-pelvis-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-torso-pelvis-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-torso-genitals': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-torso-genitals-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-torso-genitals-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-torso-skin': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-torso-skin-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-torso-skin-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-arms-shoulder': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-arms-shoulder-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-arms-shoulder-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-arms-arm': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-arms-arm-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-arms-arm-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-arms-elbow': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-arms-elbow-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-arms-elbow-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-arms-wrist': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-arms-wrist-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-arms-wrist-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-arms-hand': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-arms-hand-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-arms-hand-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-arms-digit': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-arms-digit-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-arms-digit-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-arms-skin': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-arms-skin-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-arms-skin-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-legs-hip': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-legs-hip-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-legs-hip-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-legs-leg': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-legs-leg-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-legs-leg-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-legs-knee': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-legs-knee-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-legs-knee-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-legs-ankle': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-legs-ankle-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-legs-ankle-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-legs-foot': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-legs-foot-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-legs-foot-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-legs-toes': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-legs-toes-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-legs-toes-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-upper-muscle': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-upper-muscle-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-upper-muscle-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-torso-muscle': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-torso-muscle-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-torso-muscle-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-arms-muscle': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-arms-muscle-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-arms-muscle-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-legs-muscle': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-legs-muscle-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-legs-muscle-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-physical-injury-legs-skin': {
        // transformer: 'form',
        options: {
            transformOrder: [
                'q-applicant-physical-injuries-legs-skin-other',
                'q-applicant-physical-injuries'
            ],
            outputOrder: ['q-applicant-physical-injuries'],
            properties: {
                'q-applicant-physical-injuries': {
                    options: {
                        conditionalComponentMap: [
                            {
                                itemValue: 'phyinj-149',
                                componentIds: ['q-applicant-physical-injuries-legs-skin-other']
                            }
                        ]
                    }
                }
            }
        }
    },
    'p-applicant-dentist-address': {
        options: {
            properties: {
                'q-applicant-dentist-address-building-and-street': {
                    options: {
                        macroOptions: {
                            classes: ''
                        }
                    }
                },
                'q-applicant-dentist-address-building-and-street2': {
                    options: {
                        macroOptions: {
                            classes: ''
                        }
                    }
                }
            },
            outputOrder: [
                'q-applicant-dentist-address-building-and-street',
                'q-applicant-dentist-address-building-and-street2',
                'q-applicant-dentist-address-town-or-city',
                'q-applicant-dentist-address-county',
                'q-applicant-dentist-address-postcode'
            ]
        }
    },
    'p-applicant-you-cannot-get-compensation-violent-crime': {
        options: {
            buttonText: 'Continue anyway'
        }
    },
    'p-applicant-where-did-the-crime-happen': {
        options: {
            outputOrder: ['q-applicant-where-did-the-crime-happen', 'additional-info-help-text']
        }
    },
    'p--when-was-the-crime-reported-to-police': {
        options: {
            outputOrder: ['q--when-was-the-crime-reported-to-police', 'additional-info-help-text']
        }
    },
    'p-offender-do-you-know-the-name-of-the-offender': {
        options: {
            outputOrder: [
                'q-offender-do-you-know-the-name-of-the-offender',
                'additional-info-help-text'
            ]
        }
    },
    'p-offender-enter-offenders-name': {
        options: {
            outputOrder: ['q-offender-enter-offenders-name', 'additional-info-help-text']
        }
    },
    'p-applicant-has-crime-reference-number': {
        options: {
            outputOrder: ['q-applicant-has-crime-reference-number', 'crn-info']
        }
    }
};
