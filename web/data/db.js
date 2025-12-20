// Dispositivos
    const devicesDefault = [
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



    // Networks
    const networksDefault = [
        {
            id: 1,
            name: "Default",
            router: "<default router>",
            subnet: "192.168.1.0/24",
            concesions: "2 / 254",
            gateway: "192.168.1.1/24",
            ipBroadcast: "192.168.1.255",
            ipAvailable: "253",
            ipRange: "192.168.1.1 - 192.168.1.254",
            subnetMask: "255.255.255.0",
            dhcpPool: "249",
            dhcpRange: "192.168.1.5 - 192.168.1.254",
            comments: ""
        }
    ];



    // Logs
    const logsDefault = [
        {
            id: 1,
            type: "Placeholder",
            device: "OpenFi SelfTest",
            time: "11-12-2025 11:43",
            risk: "High",
            info: "Default event from the database",
            comments: ""
        }
    ];



    // Account data
    const accountDefault = [
        {
            id: 0,
            username: "admin",
            password: "password not specified", // admin
            firsttime: "yes",
            email: "", // no default, you set it :)
            language: "english",
            background: "bing-images",
            theme: "dark",
            instanceName: ""
        }
    ];


function resetdb() {
    localStorage.clear()
    console.log("Deleted DB")
    window.top.location.href = '../../index.html'
}

function initdb() {

    // Devices
    if (!localStorage.getItem("devices")) {
        localStorage.setItem("devices", JSON.stringify(devicesDefault))
        console.log("created devices db")
    }

    // Logs
    if (!localStorage.getItem("logs")) {
        localStorage.setItem("logs", JSON.stringify(logsDefault))
        console.log("created logs db")
    }

    // Networks
    if (!localStorage.getItem("networks")) {
        localStorage.setItem("networks", JSON.stringify(networksDefault))
        console.log("created networks db")
    }

    // Account
    if (!localStorage.getItem("account")) {
        localStorage.setItem("account", JSON.stringify(accountDefault))
        console.log("created account db")
    }

    console.log("DB Ready")
}