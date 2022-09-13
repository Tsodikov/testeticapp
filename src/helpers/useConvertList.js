export const useConvertList = () => {

    const convertRole = (roleNum) => {
        switch (roleNum) {
            case '1': return 'ADMIN';
            case '2': return 'CREATOR';
            // case '3': return 'SUPERVISER';
            default: return 'END_USER';
        }
    }

    const convertCity = (cityNum) => {
        switch (cityNum) {
            case '1': return 'Paris';
            case '2': return 'Kyiv';
            case '3': return 'Tampa';
            case '4': return 'London';
            default: return;
        }
    }
    
    const convertCountry = (countryNum) => {
        switch (countryNum) {
            case '1': return 'USA';
            case '2': return 'Ukraine';
            case '3': return 'Spain';
            case '4': return 'Great Britain';
            default: return;
        }
    }

    const convertCategory = (categoryNum) => {
        switch (categoryNum) {
            case '1': return 'University';
            case '2': return 'College';
            case '3': return 'Business';
            case '4': return 'Goverment';
            default: return;
        }
    }

    return {
        convertCategory,
        convertCity,
        convertCountry,
        convertRole,
    }
}