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
        radios: [
            {
                name: "radio0",
                channel: 6,
                bandwidth: "20MHz",
                frequency: "2.437 GHz",
                wifi_standard: "Wifi 4",
                speed: "? Mbit/s",
                clients: 2
            }
        ]
    },
    {
        id: 4,
        nickname: "Switch Pasillo",
        name: "switch pasillo",
        ip: "192.168.5.20",
        status: "Unknown",
        uptime: "0d 0h 0m",
        model: "TP-Link TL-SG108E",
        firmware: "1.0.12",
        version: "1.0.12",
        ram_cpu: "47% / 2.5%",
        radios: []
    },
    {
        id: 5,
        nickname: "Cámara Garaje",
        name: "cámara garaje",
        ip: "192.168.5.50",
        status: "Online",
        uptime: "8d 6h 14m",
        model: "Reolink RLC-520",
        firmware: "3.1.0",
        version: "3.1.0",
        ram_cpu: "47% / 2.5%",
        radios: []
    },
    {
        id: 6,
        nickname: "NAS Multimedia",
        name: "nas multimedia",
        ip: "192.168.5.30",
        status: "Online",
        uptime: "16d 11h 02m",
        model: "Synology DS220+",
        firmware: "DSM 7.2.1",
        version: "DSM 7.2.1",
        ram_cpu: "47% / 2.5%",
        radios: []
    },
    {
        id: 7,
        nickname: "AP Terraza",
        name: "ap terraza",
        ip: "192.168.5.4",
        status: "Offline",
        uptime: "—",
        model: "TP-Link EAP225 Outdoor",
        firmware: "5.1.9",
        version: "5.1.9",
        ram_cpu: "47% / 2.5%",
        radios: [
            {
                name: "radio0",
                channel: 13,
                bandwidth: "20MHz",
                frequency: "2.472 GHz",
                wifi_standard: "Wifi 4",
                speed: "72 Mbit/s",
                clients: 0
            },
            {
                name: "radio1",
                channel: 52,
                bandwidth: "80MHz",
                frequency: "5.260 GHz",
                wifi_standard: "Wifi 5",
                speed: "867 Mbit/s",
                clients: 0
            }
        ]
    },
    {
        id: 8,
        nickname: "Servidor Domótica",
        name: "servidor domótica",
        ip: "192.168.5.40",
        status: "Online",
        uptime: "12d 19h 33m",
        model: "Intel NUC 8",
        firmware: "Home Assistant OS 12.3",
        version: "Home Assistant OS 12.3",
        ram_cpu: "47% / 2.5%",
        radios: []
    },
    {
        id: 9,
        nickname: "Switch Rack",
        name: "switch rack",
        ip: "192.168.5.21",
        status: "Online",
        uptime: "29d 7h 01m",
        model: "MikroTik CRS112-8P-4S",
        firmware: "RouterOS 7.16",
        version: "RouterOS 7.16",
        ram_cpu: "47% / 2.5%",
        radios: []
    },
    {
        id: 10,
        nickname: "Pi-hole DNS",
        name: "pi-hole dns",
        ip: "192.168.5.5",
        status: "Update Available",
        uptime: "4d 22h 56m",
        model: "Raspberry Pi 4",
        firmware: "Pi-hole 6.0",
        version: "Pi-hole 6.0",
        ram_cpu: "47% / 2.5%",
        radios: []
    }
];