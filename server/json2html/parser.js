const json2html = require('node-json2html')

// PROFILE
const profileName = {'<>':'div', id:'profile-name', class:'profile-name', html:'${name}'};
const profileHeadline = {'<>':'div', id:'profile-headline', class:'profile-headline', html:'${headline}'};
const profileLocation = {'<>':'div', id:'profile-location', class:'profile-location', html:'${location}'};
const profileSummary = {'<>':'div', id:'profile-summary', class:'profile-summary', html:'${summary}'};
const profileTemplate = {'<>':'div', id:'profile', class:'profile', html:[ profileName, profileHeadline, profileLocation, profileSummary ]};
// EDUCATIONS
const educationsTitle = {'<>':'div', id:'educations-title', class:'educations-title', html:'${title}'};
const educationsDegree = {'<>':'div', id:'educations-degree', class:'educations-degree', html:'${degree}'};
const educationsItem = {'<>':'li', id:'educations-item', class:'educations-item', html:[ educationsTitle, educationsDegree ]};
const educationsTemplate = {'<>':'ul', id:'educations', class:'educations', html: '${educations}'};
// POSITIONS
const positionsTitle = {'<>':'div', id:'positions-title', class:'positions-title', html:'${title}'};
const positionsCompany = {'<>':'div', id:'positions-company', class:'positions-company', html:'${company}'};
const positionsItem = {'<>':'li', id:'positions-item', class:'positions-item', html:[ positionsTitle, positionsCompany ]};
const positionsTemplate = {'<>':'ul', id:'positions', class:'positions', html: '${positions}'};
// ALL
const defaultTemplate = {'<>':'div', id:'content', class: 'content', html: '${profile}${educationList}${positionList}'};

const parse = (jsonProfile) => {
  const json = Object.assign({}, { 
    profile: jsonProfile.profile, 
    positions: jsonProfile.positions, 
    educations: jsonProfile.educations 
  })
  return json2html.transform({ 
      profile: json2html.transform(json.profile, profileTemplate), 
      educationList: json2html.transform({ educations: json2html.transform(json.educations, educationsItem)}, educationsTemplate),
      positionList: json2html.transform({ positions: json2html.transform(json.positions, positionsItem)}, positionsTemplate),
  }, defaultTemplate);
};

module.exports = { parse };