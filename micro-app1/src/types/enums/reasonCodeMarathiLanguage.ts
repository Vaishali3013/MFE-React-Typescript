interface ReasonCode {
    name: string;
    marathiName: string;
}

type ReasonCodeMarathiLanguage = Record<string, ReasonCode>;

export const reasonCodeMarathiLanguage: ReasonCodeMarathiLanguage = {
    assignReasonCode: {
        name: 'Assign Reason Code',
        marathiName: 'स्टॉपेजचे कारण एंटर करा',
    },
    enterReasonCode: {
        name: 'Enter Reason Code',
        marathiName: 'स्टॉपेजचे कारण एंटर करा',
    },
    reasonCode: {
        name: 'Reason Code',
        marathiName: 'स्टॉपेजची कारणे',
    },
    startTime: {
        name: 'Start Time',
        marathiName: 'सुरुवातीची वेळ',
    },
    endTime: {
        name: 'End Time',
        marathiName: 'शेवटची वेळ',
    },
    duration: {
        name: 'Duration',
        marathiName: 'कालावधी',
    },
    Washer: {
        name: 'Washer',
        marathiName: 'वॉशर',
    },
    EBI: {
        name: 'EBI',
        marathiName: 'ई बी आय',
    },
    Filler: {
        name: 'Filler',
        marathiName: 'फिलर',
    },
    LBI: {
        name: 'LBI',
        marathiName: 'एल बी आय',
    },
    Labeller: {
        name: 'Labeller',
        marathiName: 'लेबलर',
    },
    AllStoppages: {
        name: 'All Stoppages',
        marathiName: 'सर्व स्टॉपेज(थांबे)',
    },
    UnassignedStoppages: {
        name: 'Unassigned Stoppages',
        marathiName: 'एन्ट्री न झालेले स्टॉपेज',
    },
    AssignedStoppages: {
        name: 'Assigned Stoppages',
        marathiName: 'एन्ट्री झालेले स्टॉपेज',
    },
    Back: {
        name: 'Back',
        marathiName: 'मागे',
    },
    Submit: {
        name: 'Submit',
        marathiName: 'सेव्ह करा',
    },
};
