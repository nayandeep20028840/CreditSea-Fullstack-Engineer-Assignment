const xml2js = require('xml2js');

// XML to JSON parser with explicitArray set to false
const parseXML = async (xml) => {
    try {
        const parser = new xml2js.Parser({ explicitArray: false });
        const parsedData = await parser.parseStringPromise(xml);
        return parsedData;
    } catch (error) {
        throw new Error('Error parsing XML');
    }
};

module.exports = parseXML;
