import React from 'react';
import Swatch from "./Swatch";

export default function Legend() {
    return (
        <div>
            <h2 className="mr-8 text-center mb-1 font-bold">Status Color Code</h2>
            <div className="flex items-center justify-between">

                <Swatch className="bg-gray-300" label="PENDING"/>
                <Swatch className="bg-green-300" label="APPROVED/OVERRIDE"/>
                <Swatch className="bg-red-300" label="DENIED"/>
                <Swatch className="bg-orange-300" label="NO-RETURN"/>
            </div>
        </div>
    )
}

