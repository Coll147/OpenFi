// Dispositivos
window.devices = [
    {
        id: 1,
        nickname: "AP Salón",
        name: "ap salón",
        ip: "192.168.5.10",
        status: "Online",
        uptime: "2d 4h 12m",
        model: "Xiaomi AX3200",
        firmware: "OpenWrt 24.10.2",
        version: "OpenWrt 24.10.2",
        ram_cpu: "47% / 2.5%",
        radios: [
            {
                name: "radio0",
                channel: 11,
                bandwidth: "40MHz",
                frequency: "2.462 GHz",
                wifi_standard: "Wifi 4",
                speed: "144 Mbit/s",
                clients: 3
            },
            {
                name: "radio1",
                channel: 100,
                bandwidth: "80MHz",
                frequency: "5.500 GHz",
                wifi_standard: "Wifi 6",
                speed: "1200 Mbit/s",
                clients: 1
            },
            {
                name: "radio2",
                channel: 6,
                bandwidth: "20MHz",
                frequency: "2.437 GHz",
                wifi_standard: "Wifi 4",
                speed: "72 Mbit/s",
                clients: 0
            }
        ]
    },
    {
        id: 2,
        nickname: "AP Dormitorio",
        name: "ap dormitorio",
        ip: "192.168.5.3",
        status: "Update Available",
        uptime: "1d 3h 45m",
        model: "Cudy WR3000E v1",
        firmware: "OpenWrt 24.10.3",
        version: "OpenWrt 24.10.3",
        ram_cpu: "47% / 2.5%",
        radios: [
            {
                name: "radio0",
                channel: 1,
                bandwidth: "20MHz",
                frequency: "2.412 GHz",
                wifi_standard: "Wifi 4",
                speed: "65 Mbit/s",
                clients: 1
            }
        ]
    },
    {
        id: 3,
        nickname: "Router Principal",
        name: "router principal",
        ip: "192.168.5.1",
        status: "Online",
        uptime: "5d 1h 23m",
        model: "Ubiquiti EdgeRouter 4",
        firmware: "OpenWrt 24.10-SNAPSHOT",
        version: "OpenWrt 24.10-SNAPSHOT",
        ram_cpu: "47% / 2.5%",
        radios: []
    }
];



// Logs
window.logs = [
    {
        id: 1,
        type: "Disconnection",
        device: "Router Principal",
        time: "11-12-2025 11:43pm",
        risk: "High",
        info: "The device has beed disconected from the networkj. Check it",
        comments: ""
    }
];
