/*
    Placeholder file. This will search the data for the address of applicant
 */
import Applicant from "../../../models/applicant_schema";

Applicant.find({
    homeAddress: {
        homeStreet1: '123 Oak St.',
        lubbawubbadubdub: true
    }
})


// get collection of all documents/records
// iterate through and find address equal to submission address
// display these address in a new component with the following features
//  list them as cards
// clicking the card will expand to show relevant information to cross check for requirements
// needed info:  address, adults living at that address at that time.