// Train Schedule Data - Based on Official GRDA Train Timetable
// Routes: Tema Harbour ↔ Afienya (Zone 1), Afienya ↔ Adomi (Zone 2)

export const routeSchedules = [
    // ============================================
    // ROUTE 1: TEMA HARBOUR → AFIENYA (Morning & Evening)
    // ============================================
    {
        id: 1,
        origin: "Tema Harbour",
        destination: "Afienya",
        serviceName: "Tema - Afienya Service",
        days: "Daily",
        schedules: [
            {
                period: "Morning",
                stops: [
                    { station: "Tema Harbour", arrival: null, departure: "5:30am", isStop: false },
                    { station: "Industrial Area", arrival: null, departure: null, isStop: true },
                    { station: "Ashaiman", arrival: null, departure: null, isStop: true },
                    { station: "Afienya", arrival: "5:45am", departure: null, isStop: false }
                ]
            },
            {
                period: "Morning (2nd)",
                stops: [
                    { station: "Tema Harbour", arrival: null, departure: "7:20am", isStop: false },
                    { station: "Industrial Area", arrival: null, departure: null, isStop: true },
                    { station: "Ashaiman", arrival: null, departure: null, isStop: true },
                    { station: "Afienya", arrival: "7:50am", departure: null, isStop: false }
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
        fares: {
            temaToAfienya: "GHS 20.00",
            afienyaToAdomi: "GHS 35.00",
            temaToAdomi: "GHS 50.00"
        }
    },

    // ============================================
    // ROUTE 2: AFIENYA → TEMA HARBOUR (Morning & Evening)
    // ============================================
    {
        id: 2,
        origin: "Afienya",
        destination: "Tema Harbour",
        serviceName: "Afienya - Tema Service",
        days: "Daily",
        schedules: [
            {
                period: "Morning",
                stops: [
                    { station: "Afienya", arrival: null, departure: "6:30am", isStop: false },
                    { station: "Ashaiman", arrival: null, departure: null, isStop: true },
                    { station: "Industrial Area", arrival: null, departure: null, isStop: true },
                    { station: "Tema Harbour", arrival: "6:45am", departure: null, isStop: false }
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
        fares: {
            temaToAfienya: "GHS 20.00",
            afienyaToAdomi: "GHS 35.00",
            temaToAdomi: "GHS 50.00"
        }
    },

    // ============================================
    // ROUTE 3: AFIENYA → ADOMI (Extended Route)
    // ============================================
    {
        id: 3,
        origin: "Afienya",
        destination: "Adomi",
        serviceName: "Afienya - Adomi Service",
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
        fares: {
            temaToAfienya: "GHS 20.00",
            afienyaToAdomi: "GHS 35.00",
            temaToAdomi: "GHS 50.00"
        }
    },

    // ============================================
    // ROUTE 4: ADOMI → AFIENYA (Return Route)
    // ============================================
    {
        id: 4,
        origin: "Adomi",
        destination: "Afienya",
        serviceName: "Adomi - Afienya Service",
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
        fares: {
            temaToAfienya: "GHS 20.00",
            afienyaToAdomi: "GHS 35.00",
            temaToAdomi: "GHS 50.00"
        }
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
    fares: { firstClass: route.fares.temaToAdomi, standard: route.fares.temaToAfienya }
}));
