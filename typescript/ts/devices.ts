export interface Device {
    name: string;
}

export class Phone implements Device {
    constructor(public name: string) {}
}

export function Call(phone: Phone): void {
    console.log('Make a call by', phone.name);
}

// аналогично
// export { Device, Phone, Call as Devices };
