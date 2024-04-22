import OPCua from 'assets/icons/opc-ua.svg';
import OPCClassic from 'assets/icons/opc-classic.svg';
import IndustrialConnector from 'assets/icons/industrial-controller.svg';
import Modbus from 'assets/icons/modbus.svg';
import BACnetLogo from 'assets/icons/BACnet_logo.svg';
import Ethernet from 'assets/icons/ethernet.svg';
import Mqtt from 'assets/icons/mqtt.svg';
import SerialDevices from 'assets/icons/serial-devices.svg';
import BluetoothDevices from 'assets/icons/bluetooth-device.svg';
import ModbusRTU from 'assets/icons/modbus-rtu.svg';

export const communicationInterfaceOptions = [
    {
        heading: 'OPC UA',
        info: 'Connect to any external OPC Server using OPC Client. Alarms & Events from OPC Server can be stored & streamed in real time.​',
        value: 'OPC',
        tooltip:
            'OPC is an interoperability standard for the safe and dependable exchange of data in the industrial automation and other industries. It is platform agnostic and ensures the seamless flow of information between devices from various vendors',
        image: OPCua,
        active: false,
    },
    {
        heading: 'OPC DA Classic',
        info: 'Connect to OPC DA Classic DA servers using platforms OPC DA client. Data can be     Read/Wrtie in real time using this driver.',
        value: 'OPC DA',
        tooltip:
            'OPC is an interoperability standard for the safe and dependable exchange of data in the industrial automation and other industries. It is platform agnostic and ensures the seamless flow of information between devices from various vendors',
        image: OPCClassic,
        active: false,
    },
    {
        heading: 'Industrial Controller​',
        info: 'Select Industrial Controller device type if you are looking to connect & retrieve data from your industrial controllers devices or PLCs such as Allen Bradley , Siemens , etc.​',
        value: 'Industrial Controller​',
        tooltip: 'Industrial Controller​',
        image: IndustrialConnector,
        active: false,
        // disabled: false,
    },
    {
        heading: 'Modbus TCP Devices​',
        info: 'Select Modbus TCP Device if your device communicates on Modbus TCP Protocol.',
        value: 'Modbus TCP Devices​',
        tooltip: '',
        image: Modbus,
        active: false,
        // disabled: false,
    },
    {
        heading: 'Modbus RTU Devices',
        info: 'Select Modbus RTU Device if your device communicates on Modbus RTU Protocol',
        value: 'Modbus RTU Devices',
        tooltip: '',
        image: ModbusRTU,
        active: false,
        disabled: true,
    },
    {
        heading: 'BACnet',
        info: 'Connect the BACnet servers using the platform client.',
        value: 'BACnet',
        tooltip: '',
        image: BACnetLogo,
        active: false,
        disabled: false,
    },
    {
        heading: 'Other Ethernet Devices',
        info: 'Select Other Ethernet Devices if your device communicates on Ethernet TCP protocol & is not covered in the above device types',
        value: 'Other Ethernet Devices',
        tooltip: '',
        image: Ethernet,
        active: false,
        disabled: true,
    },
    {
        heading: 'MQTT Devices',
        info: 'Select MQTT Device if the device you are communicating to supports MQTT Protocol.',
        value: 'MQTT Devices',
        tooltip: '',
        image: Mqtt,
        active: false,
        disabled: true,
    },
    {
        heading: 'Serial Devices',
        info: 'Select Serial Device device type if your device supports serial communication protocols such as USB, RS232, etc.',
        value: 'Serial Devices',
        tooltip: '',
        image: SerialDevices,
        active: false,
        disabled: true,
    },
    {
        heading: 'Bluetooth Devices',
        info: 'Select Bluetooth Device device type if the device you are connecting with supports bluetooth protocols.',
        value: 'Bluetooth Devices',
        tooltip: '',
        image: BluetoothDevices,
        active: false,
        disabled: true,
    },
];
