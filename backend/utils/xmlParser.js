const xml2js = require('xml2js');

// XML to JSON parser
const parseXML = async (xml) => {
    try {
        const parser = new xml2js.Parser();
        const parsedData = await parser.parseStringPromise(xml);
        return parsedData;
    } catch (error) {
        throw new Error('Error parsing XML');
    }
};

module.exports = parseXML;
