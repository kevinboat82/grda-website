// Train Schedule Data - Based on Official GRDA Train Timetable
// Routes: Tema Harbour ↔ Afienya (Zone 1), Afienya ↔ Adomi (Zone 2), Kojokrom ↔ Sekondi/Takoradi (Western)

export const routeSchedules = [
    // ============================================
    // ROUTE 1: TEMA HARBOUR → AFIENYA (Morning & Evening)
    // ============================================
    {
        id: 1,
        origin: "Tema Harbour",
        destination: "Afienya",
        serviceName: "Tema - Afienya Service",
        region: "accra",
        days: "Daily",
        schedules: [
            {
                period: "Morning",
                stops: [
                    { station: "Tema Harbour", arrival: null, departure: "6:00am", isStop: false },
                    { station: "Industrial Area", arrival: null, departure: null, isStop: true },
                    { station: "Ashaiman", arrival: null, departure: null, isStop: true },
                    { station: "Afienya", arrival: "6:45am", departure: null, isStop: false }
                ]
            },
            {
                period: "Morning (2nd)",
                stops: [
                    { station: "Tema Harbour", arrival: null, departure: "7:00am", isStop: false },
                    { station: "Industrial Area", arrival: null, departure: null, isStop: true },
                    { station: "Ashaiman", arrival: null, departure: null, isStop: true },
                    { station: "Afienya", arrival: "7:45am", departure: null, isStop: false }
                ]
            },
            {
                period: "Afternoon/Evening",
                stops: [
                    { station: "Tema Harbour", arrival: null, departure: "3:45pm", isStop: false },
                    { station: "Industrial Area", arrival: null, departure: null, isStop: true },
                    { station: "Ashaiman", arrival: null, departure: null, isStop: true },
                    { station: "Afienya", arrival: "3:55pm", departure: null, isStop: false }
                ]
            },
            {
                period: "Evening",
                stops: [
                    { station: "Tema Harbour", arrival: null, departure: "5:30pm", isStop: false },
                    { station: "Industrial Area", arrival: null, departure: null, isStop: true },
                    { station: "Ashaiman", arrival: null, departure: null, isStop: true },
                    { station: "Afienya", arrival: "6:00pm", departure: null, isStop: false }
                ]
            }
        ],
        fares: [
            { route: "Tema Harbour - Afienya", adult: 15, children: 7 }
        ]
    },

    // ============================================
    // ROUTE 2: AFIENYA → TEMA HARBOUR (Morning & Evening)
    // ============================================
    {
        id: 2,
        origin: "Afienya",
        destination: "Tema Harbour",
        serviceName: "Afienya - Tema Service",
        region: "accra",
        days: "Daily",
        schedules: [
            {
                period: "Morning",
                stops: [
                    { station: "Afienya", arrival: null, departure: "7:00am", isStop: false },
                    { station: "Ashaiman", arrival: null, departure: null, isStop: true },
                    { station: "Industrial Area", arrival: null, departure: null, isStop: true },
                    { station: "Tema Harbour", arrival: "7:45am", departure: null, isStop: false }
                ]
            },
            {
                period: "Morning (2nd)",
                stops: [
                    { station: "Afienya", arrival: null, departure: "8:00am", isStop: false },
                    { station: "Ashaiman", arrival: null, departure: null, isStop: true },
                    { station: "Industrial Area", arrival: null, departure: null, isStop: true },
                    { station: "Tema Harbour", arrival: "8:15am", departure: null, isStop: false }
                ]
            },
            {
                period: "Afternoon/Evening",
                stops: [
                    { station: "Afienya", arrival: null, departure: "4:20pm", isStop: false },
                    { station: "Ashaiman", arrival: null, departure: null, isStop: true },
                    { station: "Industrial Area", arrival: null, departure: null, isStop: true },
                    { station: "Tema Harbour", arrival: "4:50pm", departure: null, isStop: false }
                ]
            },
            {
                period: "Evening",
                stops: [
                    { station: "Afienya", arrival: null, departure: "6:15pm", isStop: false },
                    { station: "Ashaiman", arrival: null, departure: null, isStop: true },
                    { station: "Industrial Area", arrival: null, departure: null, isStop: true },
                    { station: "Tema Harbour", arrival: "6:30pm", departure: null, isStop: false }
                ]
            },
            {
                period: "Last Train (Adomi Mop Up)",
                stops: [
                    { station: "Afienya", arrival: null, departure: "6:30pm", isStop: false },
                    { station: "Ashaiman", arrival: null, departure: null, isStop: true },
                    { station: "Industrial Area", arrival: null, departure: null, isStop: true },
                    { station: "Tema Harbour", arrival: "7:10pm", departure: null, isStop: false }
                ],
                note: "Adomi Train Mop Up - Last Train"
            }
        ],
        fares: [
            { route: "Tema Harbour - Afienya", adult: 15, children: 7 }
        ]
    },

    // ============================================
    // ROUTE 3: AFIENYA → ADOMI (Extended Route)
    // ============================================
    {
        id: 3,
        origin: "Afienya",
        destination: "Adomi",
        serviceName: "Afienya - Adomi Service",
        region: "accra",
        days: "Daily",
        schedules: [
            {
                period: "Morning",
                stops: [
                    { station: "Afienya", arrival: null, departure: "6:30am", isStop: false },
                    { station: "Shai Hills", arrival: null, departure: null, isStop: true },
                    { station: "Doryumu JC", arrival: null, departure: null, isStop: true },
                    { station: "Akuse Halt", arrival: null, departure: null, isStop: true },
                    { station: "Kpong", arrival: null, departure: null, isStop: true },
                    { station: "Senchi Halt", arrival: null, departure: null, isStop: true },
                    { station: "Adomi", arrival: "7:45am", departure: null, isStop: false }
                ]
            },
            {
                period: "Afternoon",
                stops: [
                    { station: "Afienya", arrival: null, departure: "3:00pm", isStop: false },
                    { station: "Shai Hills", arrival: null, departure: null, isStop: true },
                    { station: "Doryumu JC", arrival: null, departure: null, isStop: true },
                    { station: "Akuse Halt", arrival: null, departure: null, isStop: true },
                    { station: "Kpong", arrival: null, departure: null, isStop: true },
                    { station: "Senchi Halt", arrival: null, departure: null, isStop: true },
                    { station: "Adomi", arrival: "5:00pm", departure: null, isStop: false }
                ]
            }
        ],
        fares: [
            { route: "Afienya - Doryumu JC", adult: 10, children: 5 }
        ]
    },

    // ============================================
    // ROUTE 4: ADOMI → AFIENYA (Return Route)
    // ============================================
    {
        id: 4,
        origin: "Adomi",
        destination: "Afienya",
        serviceName: "Adomi - Afienya Service",
        region: "accra",
        days: "Daily",
        schedules: [
            {
                period: "Morning",
                stops: [
                    { station: "Adomi", arrival: null, departure: "8:00am", isStop: false },
                    { station: "Senchi Halt", arrival: null, departure: null, isStop: true },
                    { station: "Kpong", arrival: null, departure: null, isStop: true },
                    { station: "Akuse Halt", arrival: null, departure: null, isStop: true },
                    { station: "Doryumu JC", arrival: null, departure: null, isStop: true },
                    { station: "Shai Hills", arrival: null, departure: null, isStop: true },
                    { station: "Afienya", arrival: "9:30am", departure: null, isStop: false }
                ]
            },
            {
                period: "Evening",
                stops: [
                    { station: "Adomi", arrival: null, departure: "5:15pm", isStop: false },
                    { station: "Senchi Halt", arrival: null, departure: null, isStop: true },
                    { station: "Kpong", arrival: null, departure: null, isStop: true },
                    { station: "Akuse Halt", arrival: null, departure: null, isStop: true },
                    { station: "Doryumu JC", arrival: null, departure: null, isStop: true },
                    { station: "Shai Hills", arrival: null, departure: null, isStop: true },
                    { station: "Afienya", arrival: "6:45pm", departure: null, isStop: false }
                ]
            }
        ],
        fares: [
            { route: "Afienya - Doryumu JC", adult: 10, children: 5 }
        ]
    },

    // ============================================
    // ROUTE 5: KOJOKROM ↔ SEKONDI (Round Trip - Western)
    // ============================================
    {
        id: 5,
        origin: "Kojokrom",
        destination: "Sekondi",
        serviceName: "Kojokrom - Sekondi Service",
        region: "takoradi",
        roundTrip: true,
        days: "Daily",
        schedules: [
            {
                period: "Morning",
                stops: [
                    { station: "Kojokrom", arrival: null, departure: "6:40am", isStop: false },
                    { station: "Gyandu Halt", arrival: null, departure: null, isStop: true },
                    { station: "Sekondi", arrival: "6:50am", departure: null, isStop: false }
                ]
            },
            {
                period: "Evening (Return)",
                stops: [
                    { station: "Sekondi", arrival: null, departure: "5:45pm", isStop: false },
                    { station: "Gyandu Halt", arrival: null, departure: null, isStop: true },
                    { station: "Kojokrom", arrival: "5:55pm", departure: null, isStop: false }
                ]
            }
        ],
        fares: [
            { route: "Kojokrom - Sekondi", adult: 5, children: 3 }
        ]
    },

    // ============================================
    // ROUTE 6: KOJOKROM ↔ TAKORADI (Round Trip - Western)
    // ============================================
    {
        id: 6,
        origin: "Kojokrom",
        destination: "Takoradi",
        serviceName: "Kojokrom - Takoradi Service",
        region: "takoradi",
        roundTrip: true,
        days: "Daily",
        schedules: [
            {
                period: "Morning",
                stops: [
                    { station: "Kojokrom", arrival: null, departure: "7:20am", isStop: false },
                    { station: "Ketan", arrival: null, departure: null, isStop: true },
                    { station: "Adiembra", arrival: null, departure: null, isStop: true },
                    { station: "Essaman", arrival: null, departure: null, isStop: true },
                    { station: "Butuah", arrival: null, departure: null, isStop: true },
                    { station: "Takoradi", arrival: "7:40am", departure: null, isStop: false }
                ]
            },
            {
                period: "Evening (Return)",
                stops: [
                    { station: "Takoradi", arrival: null, departure: "5:20pm", isStop: false },
                    { station: "Butuah", arrival: null, departure: null, isStop: true },
                    { station: "Essaman", arrival: null, departure: null, isStop: true },
                    { station: "Adiembra", arrival: null, departure: null, isStop: true },
                    { station: "Ketan", arrival: null, departure: null, isStop: true },
                    { station: "Kojokrom", arrival: "5:40pm", departure: null, isStop: false }
                ]
            }
        ],
        fares: [
            { route: "Kojokrom - Takoradi", adult: 7, children: 4 }
        ]
    }
];

// Legacy format for backward compatibility
export const schedules = routeSchedules.map(route => ({
    id: route.id,
    serviceName: route.serviceName,
    origin: route.origin,
    destination: route.destination,
    departureTime: route.schedules[0].stops[0].departure,
    days: route.days,
    fares: { adult: route.fares[0]?.adult, children: route.fares[0]?.children }
}));
