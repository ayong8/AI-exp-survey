import { BrowserRouter as Router,
  Routes,
  Route,
  useRoutes, } from "react-router-dom";
import _, { random, shuffle } from 'lodash';

import "./App.css";
import Main from "./components/Main";
import data from './data/data.json';


function App() {
  const expTypes = [
    'complete',
    'counterfactual',
    'contrastive_o',
    'contrastive_t',
    'case_based_homo',
    'case_based_hetero'
  ];

  const getContents = (dataForContext) => {
    return {
      title:
        "Explanation strategies",
      showProgressBar: "top",
      progressBarType: "buttons",
      pages: [
        {
          name: "page0",
          elements: [
            {
              type: "panel",
              name: "panel1",
              elements: [
                {
                  type: "html",
                  name: "introSection1",
                  html: `<p style='font-size: 1rem; font-weight: 500; text-align: right; color: gray '>(${dataForContext.contextId})</p><p style='font-size: 1.3rem; font-weight: 500;'>In this survey, we will ask you to evaluate different types of explanations. This survey is designed to study how different ways of explaining AI-assisted decisions (i.e., ${dataForContext.decisionQuestion}) are effective in providing the rationales on a decision.                     The survey consists of four parts:                     <ul style='font-size: 1.1rem'>                    <li> <b>Demographic survey</b>: we will ask about basic demographic information                     <li> <b>Decision-making scenario</b>: we will illustrate a scenario on an AI-assisted decision-making context where you were given a decision based on your qualifications listed in a table. </li>                    <li> <b>Possible explanations</b>: you will read explanations on why you were given the decision in the scenario, which are written with different strategies. </li><li> <b>Rating</b>: Given the explanations, you will evaluate how those explanations are effective in multiple perspectives. </li></p>`
                }
              ]
            },
          ],
          navigationTitle: "Introduction"
        },
        {
          name: "page1",
          elements: [
            {
              type: "panel",
              name: "panel1",
              elements: [
                {
                  type: "html",
                  name: "introSection1",
                  html: "<h3 style='text-align: left'>In this section, we will ask you basic demographic information about gender, ethnicity, education, and decision-making style.</h3>"
                }
              ]
            },
            {
              type: "comment",
              name: "userId",
              title: "Please enter your Prolific ID.",
              isRequired: false
            },
            {
              type: "radiogroup",
              name: "gender",
              title: "How would you describe your gender identity?",
              isRequired: false,
              choices: [
                "Male",
                "Female",
                "Non-binary",
                "Other / prefer not to say"
              ],
              colCount: 4
            },
            {
              type: "radiogroup",
              name: "age",
              title: "What is your age?",
              isRequired: false,
              choices: [
                "18-24 years old",
                "25-34 years old",
                "35-44 years old",
                "45-54 years old",
                "55-64 years old",
                "65 years old or above",
              ],
              colCount: 6
            },
            {
              type: "checkbox",
              name: "ethnicity",
              title: "What categories describe you? Select all choices that apply.",
              isRequired: false,
              choices: [
                "Native American or Alaskan Native",
                "Asian",
                "Black or African American",
                "Hispanic or Latino",
                "Native Hawaiian or Other Pacific Islander",
                "Middle Eastern or North African",
                "White",
                "Some other race, ethnicity, or origin, or prefer not to say"
              ]
            },
            {
              type: "radiogroup",
              name: "education",
              title: "What is the highest degree of level of school you have completed?",
              isRequired: false,
              choices: [
                "No schooling completed",
                "Middle school",
                "Some high school, no diploma",
                "High school graduate, diploma or the equivalent (for example: GED) Some college credit, no degree",
                "Trade/technical/vocational training Associate degree",
                "Bachelor's degree",
                "Master's degree",
                "Doctorate degree",
                "Professional degree",
                "Prefer not to say"
              ],
              hasNone: true
            },
            {
              type: "radiogroup",
              name: "occupation",
              title: "How would you describe your occupation?",
              isRequired: false,
              choices: [
                "Students",
                "Finance & economics",
                "Medical & healthcare",
                "Transportation services, drivers",
                "Software engineers, AI practitioners",
                "Others"
              ],
              hasNone: true
            },
            {
              type: "matrix",
              name: "decisionMakingStyle",
              title: "How do you describe your decision-making styles?",
              isRequired: false,
              columns: [
                {
                  value: 1,
                  text: "Strongly Disagree"
                },
                {
                  value: 2,
                  text: "Disagree"
                },
                {
                  value: 3,
                  text: "Neutral"
                },
                {
                  value: 4,
                  text: "Agree"
                },
                {
                  value: 5,
                  text: "Strongly Agree"
                }
              ],
              rows: [
                {
                  value: "rational",
                  text: "I explore all of my options before making a decision in a logical and systematic way."
                },
                {
                  value: "avoidant",
                  text: "I avoid making important decisions until the pressure is on."
                },
                {
                  value: "dependent",
                  text: "I rarely make important decisions without consulting other people."
                },
                {
                  value: "intuitive",
                  text: "When I make decisions, I tend to rely on my intuition."
                },
                {
                  value: "swift",
                  text: "I generally make snap decisions."
                }
              ]
            }
          ],
          navigationTitle: "Basic demographics",
          navigationDescription: "User traits"
        },
        {
          name: "page2",
          elements: [
            {
              type: "panel",
              name: "introSection1",
              elements: [
                {
                  type: "html",
                  name: "introSection2",
                  html: "<h3 style='text-align: left'>In this section, we will ask you to vividly imagine a decision-making situation. We will 1) illustrate a scenario on a AI-assisted decision-making context where you were given a decision and 2) list your status on which the decision was made by the AI system. Please answer the following questions based on your perception of the given scenario and the state of your thinking process.</h3>"
                }
              ]
            },
            {
              type: "panel",
              name: "panel1",
              elements: [
                {
                  type: "html",
                  name: "scenarioDescription",
                  html: "<h2>Scenario</h2><h3 class='scenario' style='text-align: left'>Imagine that you applied for a loan a month ago to secure more budget for buying a house.                     After the screening process, however, you were notified of being rejected from getting a loan.                     It was an unexpected result for you because there were several cases around you who were granted                     a loan. You would like to know why you were denied a loan.</h3>"
                }
              ]
            },
            {
              type: "matrix",
              name: "featureTable",
              title: "The table below shows your status and information that were used in the AI-based decision-making in the given scenario.",
              columns: [
                {
                  value: "Value",
                  text: " "
                },
              ],
              rows: [
                
              ],
              cells: {
              }
            },
            {
              type: "matrix",
              name: "situationProperty",
              title: "How do you perceive the given situation and decision regarding the properties listed below?",
              isRequired: false,
              columns: [
                {
                  value: 1,
                  text: "Strongly Disagree"
                },
                {
                  value: 2,
                  text: "Disagree"
                },
                {
                  value: 3,
                  text: "Neutral"
                },
                {
                  value: 4,
                  text: "Agree"
                },
                {
                  value: 5,
                  text: "Strongly Agree"
                }
              ],
              rows: [
                {
                  value: "highStakes",
                  text: "High-stakes (I think the consequence of the decision in the situation is critical)"
                },
                {
                  value: "professional",
                  text: "Professional (I think the situation requires significant domain knowledge to understand it)"
                },
                {
                  value: "timely",
                  text: "Timely (I think the situation is timely such that it only allows me a brief time to reflect the decision)"
                }
              ]
            },
            {
              type: "matrix",
              name: "attribution",
              title: "Given the situation where you are being provided an AI-assisted decision, rate the following statements.",
              isRequired: false,
              columns: [
                {
                  value: 1,
                  text: "Strongly Disagree"
                },
                {
                  value: 2,
                  text: "Disagree"
                },
                {
                  value: 3,
                  text: "Neutral"
                },
                {
                  value: 4,
                  text: "Agree"
                },
                {
                  value: 5,
                  text: "Strongly Agree"
                }
              ],
              rows: [
                {
                  value: "motivation",
                  text: `I feel it is necessary for me to deliberately think and investigate ${dataForContext.decisionText}.`
                },
                {
                  value: "opportunity",
                  text: `I feel I have enough time and resources to deliberately think and investigate ${dataForContext.decisionText}.`
                },
                {
                  value: "ability",
                  text: "I feel I have the required domain knowledge to understand the information regarding my status used in this decision."
                }
              ]
            }
          ],
          navigationTitle: "Scenario",
          navigationDescription: "AI-assisted decision"
        },
        {
          name: "page3",
          elements: [
            {
              type: "panel",
              name: "description",
              elements: [
                {
                  type: "html",
                  name: "income_intro",
                  html: "<h3 style='text-align: left'>Assume the system shows one of the following 6 possible explanations to explain the rationale behind the AI decision. Please read each of them and evaluate the explanation through questions in the next pages.</h3>"
                }
              ]
            },
            {
              type: "matrix",
              name: "explanationStrategies",
              title: "Possible explanations",
              columns: [
                " "
              ],
              rows: [
                "A",
                "B",
                "C",
                "D",
                "E",
                "F"
              ],
              cells: {
                "A": {
                  " ": `${dataForContext.explanations.complete}`
                },
                "B": {
                  " ": `${dataForContext.explanations.counterfactual}`
                },
                "C": {
                  " ": `${dataForContext.explanations.contrastive_o}`
                },
                "D": {
                  " ": `${dataForContext.explanations.contrastive_t}`
                },
                "E": {
                  " ": `${dataForContext.explanations.case_based_homo}`
                },
                "F": {
                  " ": `${dataForContext.explanations.case_based_hetero}`
                }
              }
            },
            {
              type: "panel",
              name: "panel2",
              title: "After reading the scenario, given"
            }
          ],
          navigationTitle: "Possible explanations"
        },
        {
          name: "page4",
          elements: [
            {
              type: "panel",
              name: "introSection1",
              elements: [
                {
                  type: "html",
                  name: "introRankingCogOverload",
                  html: "<h3 style='text-align: left'>Given these explanations, please rank them based on your preferences regarding the questions by dragging up and down the items.</h3>"
                }
              ]
            },
            {
              type: "panel",
              name: "panelExpRanking1",
              elements: [
                {
                  type: "matrix",
                  name: "explanationDisplay1",
                  title: "Possible explanations",
                  columns: [
                    {
                      value: " ",
                      maxWidth: '30%'
                    }
                  ],
                  rows: [
                    {
                      value: "A",
                      text: ""
                    },
                    {
                      value: "B",
                      text: ""
                    },
                    {
                      value: "C",
                      text: ""
                    },
                    {
                      value: "D",
                      text: ""
                    },
                    {
                      value: "E",
                      text: ""
                    },
                    {
                      value: "F",
                      text: ""
                    }
                  ],
                  cells: {
                    "A": {
                      " ": `${dataForContext.explanations.complete}`
                    },
                    "B": {
                      " ": `${dataForContext.explanations.counterfactual}`
                    },
                    "C": {
                      " ": `${dataForContext.explanations.contrastive_o}`
                    },
                    "D": {
                      " ": `${dataForContext.explanations.contrastive_t}`
                    },
                    "E": {
                      " ": `${dataForContext.explanations.case_based_homo}`
                    },
                    "F": {
                      " ": `${dataForContext.explanations.case_based_hetero}`
                    }
                  }
                },
                {
                  type: "panel",
                  name: "panelRanking1",
                  elements: [
                    {
                      type: "rating",
                      name: "question1",
                      title: "How difficult is the information covered in the explanations overall for you to understand? (Rank them in order from most to least difficult)",
                      isRequired: false,
                      minRateDescription: "",
                      maxRateDescription: ""
                    },
                    {
                      type: "ranking",
                      name: "question2",
                      title: "How difficult is each explanation for you to distinguish important and unimportant information for your decision-making from these explanations? (Rank them in order from most to least difficult, by dragging up and down the items)",
                      isRequired: false,
                      choices: [
                        {
                          value: "A",
                          text: "A"
                        },
                        {
                          value: "B",
                          text: "B"
                        },
                        {
                          value: "C",
                          text: "C"
                        },
                        {
                          value: "D",
                          text: "D"
                        },
                        {
                          value: "E",
                          text: "E"
                        },
                        {
                          value: "F",
                          text: "F"
                        }
                      ]
                    },
                    {
                      type: "ranking",
                      name: "question3",
                      title: "How did each explanation enhance your understanding of why you were given the decision? (Rank the explanations in order from most to least beneficial)",
                      isRequired: false,
                      choices: [
                        {
                          value: "A",
                          text: "A"
                        },
                        {
                          value: "B",
                          text: "B"
                        },
                        {
                          value: "C",
                          text: "C"
                        },
                        {
                          value: "D",
                          text: "D"
                        },
                        {
                          value: "E",
                          text: "E"
                        },
                        {
                          value: "F",
                          text: "F"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ],
          navigationTitle: "Evaluation",
          navigationDescription: "Cognition"
        },
        {
          name: "page5",
          elements: [
            {
              type: "panel",
              name: "panelExpRanking2",
              elements: [
                {
                  type: "matrix",
                  name: "explanationDisplay2",
                  title: "Given these explanations, please rank them regarding the questions on the right.",
                  columns: [
                    " "
                  ],
                  rows: [
                    "A",
                    "B",
                    "C",
                    "D",
                    "E",
                    "F"
                  ],
                  cells: {
                    "A": {
                      " ": `${dataForContext.explanations.complete}`
                    },
                    "B": {
                      " ": `${dataForContext.explanations.counterfactual}`
                    },
                    "C": {
                      " ": `${dataForContext.explanations.contrastive_o}`
                    },
                    "D": {
                      " ": `${dataForContext.explanations.contrastive_t}`
                    },
                    "E": {
                      " ": `${dataForContext.explanations.case_based_homo}`
                    },
                    "F": {
                      " ": `${dataForContext.explanations.case_based_hetero}`
                    }
                  }
                },
                {
                  type: "panel",
                  name: "panelRanking2",
                  elements: [
                    {
                      type: "ranking",
                      name: "overallPreference",
                      title: "Which explanation do you prefer in an overall sense? (Rank the explanations based on your preferences)",
                      isRequired: false,
                      choices: [
                        "A",
                        "B",
                        "C",
                        "D",
                        "E",
                        "F"
                      ]
                    },
                    {
                      type: "comment",
                      name: "preferenceOpinion",
                      title: "Please briefly describe the rationale on ranking the explanations."
                    },
                    {
                      type: "html",
                      name: "introRankingExplanatoryValues",
                      html: "<h3 style='text-align: left; color: blue'>Given the explanations, please rank the following statements with first being MOST and last being LEAST.</h3>"
                    },
                    {
                      type: "ranking",
                      name: "sufficientlyDetailedAndComplete",
                      title: "The explanation is sufficiently detailed and complete.",
                      isRequired: false,
                      choices: [
                        "A",
                        "B",
                        "C",
                        "D",
                        "E",
                        "F"
                      ]
                    },
                    {
                      type: "ranking",
                      name: "understandable",
                      title: "The explanation helps me better understand the reason behind the AI decision.",
                      isRequired: false,
                      choices: [
                        "A",
                        "B",
                        "C",
                        "D",
                        "E",
                        "F"
                      ]
                    },
                    {
                      type: "ranking",
                      name: "trust",
                      title: "The explanation makes me trust the AI system more.",
                      isRequired: false,
                      choices: [
                        "A",
                        "B",
                        "C",
                        "D",
                        "E",
                        "F"
                      ]
                    },
                    {
                      type: "ranking",
                      name: "useful",
                      title: "​​The explanation is actionable, that is, I can take a further action better with it based on the AI decision.",
                      isRequired: false,
                      choices: [
                        "A",
                        "B",
                        "C",
                        "D",
                        "E",
                        "F"
                      ]
                    },
                    {
                      type: "html",
                      name: "introRankingExplanatoryValues",
                      html: "<h3 style='text-align: left; color: black'>Once you finish the survey, you will be redirected to a Prolific page to confirm your participation.</h3>"
                    },
                  ]
                }
              ]
            }
          ],
          navigationTitle: "Evaluation",
          navigationDescription: "Explanatory values"
        }
      ]
    };
  }

  

  const questionsToUpdate = [
    { pIdx: 3, qIdx: 1, inPanel: false, pName: 'page3', qName: 'explanationStrategies' },
    { pIdx: 4, qIdx: 1, inPanel: true, pName: 'page4', qName: 'explanationDisplay' },
    { pIdx: 5, qIdx: 0, inPanel: true, pName: 'page5', qName: 'explanationDisplay' }
  ];
  
  // For explanation matrix cells
  const updateEs = (questionsToUpdate, shuffledEs, jsonAllContents) => {
    questionsToUpdate.forEach(q => {
      let currP = '';
  
      (q.inPanel == true ) 
        ? currP = jsonAllContents.pages[q.pIdx].elements[q.qIdx].elements[0]
        : currP = jsonAllContents.pages[q.pIdx].elements[q.qIdx];
      
        return assignRandomEsForMatrix(currP, shuffledEs);
    });
  
    return jsonAllContents;
  }

  const updateFeatures = (dataForContext, jsonAllContents) => {
    const features = dataForContext.features;
    features.forEach((f, i) => {
      // Locate 'featureTable' component and push items
      jsonAllContents.pages[2].elements[2].rows.push({
        value: f.feature,
        text: f.feature
      });

      jsonAllContents.pages[2].elements[2].cells[f.feature] = { Value: f.value };
    });

    return jsonAllContents;
  }

  const updateScenario = (dataForContext, jsonAllContents) => {
    const scenario = dataForContext.description;
    const htmlText = `<h2>Scenario</h2><h3 class='scenario' style='text-align: left'>${scenario}</h3>`

    jsonAllContents.pages[2].elements[1].elements[0].html = htmlText;
    return jsonAllContents;
  }
  
  const assignRandomEsForMatrix = (q, shuffledEs) => {
    ['A', 'B', 'C', 'D', 'E', 'F'].map((idx, i) => {
      q.cells[idx][' '] = shuffledEs[i].exp;
    })
    
    return q;
  }
  
  const getExplanations = (dataForContext) => {
    const shuffledEIdx = _.shuffle(_.range(expTypes.length));

    return shuffledEIdx.map(shuffledIdx => ({
      name: expTypes[shuffledIdx], 
      idx: shuffledIdx,
      exp: dataForContext.explanations[expTypes[shuffledIdx]]
    }));
  }

  const getAllContents = (dataForContext) => {
    let shuffledEs = [];
    let contentsForSurvey = {};

    console.log('dataForContext in getAllContents: ', dataForContext)
    shuffledEs = getExplanations(dataForContext);
    contentsForSurvey = getContents(dataForContext);
    contentsForSurvey = updateEs(questionsToUpdate, shuffledEs, contentsForSurvey);
    contentsForSurvey = updateFeatures(dataForContext, contentsForSurvey);
    contentsForSurvey = updateScenario(dataForContext, contentsForSurvey);

    return [contentsForSurvey, shuffledEs];
  }

  const getDataForContext = (data, setting) => {
    return _.filter(data, {'context': setting.context, 'decision': setting.decision})[0];
  }

  const getDataForContextRandomly = (data) => {
    const randomIdx = _.random(0, data.length-1);
    console.log('randomIdx for context: ', randomIdx, data[randomIdx])
    return data[randomIdx];
  }
  
  // Assign contexts randomly
  if (data.length > 0) {
    const randomContext = getDataForContextRandomly(data),
      context1 = getDataForContext(data, {context: 'loan', decision: 'negative' }),
      context2 = getDataForContext(data, {context: 'medical', decision: 'negative' }),
      context3 = getDataForContext(data, {context: 'medical', decision: 'positive' }),
      context4 = getDataForContext(data, {context: 'driving', decision: 'negative' }),
      context5 = getDataForContext(data, {context: 'recommendation', decision: 'negative' }),
      context6 = getDataForContext(data, {context: 'recommendation', decision: 'positive' });

    const [contentsForSurveyInRandom, shuffledEsInRandom] = getAllContents(randomContext);
    const [contentsForSurveyInContext1, shuffledEsInContext1] = getAllContents(context1);
    const [contentsForSurveyInContext2, shuffledEsInContext2] = getAllContents(context2);
    const [contentsForSurveyInContext3, shuffledEsInContext3] = getAllContents(context3);
    const [contentsForSurveyInContext4, shuffledEsInContext4] = getAllContents(context4);
    const [contentsForSurveyInContext5, shuffledEsInContext5] = getAllContents(context5);
    const [contentsForSurveyInContext6, shuffledEsInContext6] = getAllContents(context6);

    return (
      <div className="App">
        <Routes>
          <Route exact path="/" element={
            <Main 
              dataForContext={randomContext}
              contents={contentsForSurveyInRandom}
              shuffledEs={shuffledEsInRandom}
            />} />
          <Route exact path="/1" element={
            <Main 
              dataForContext={context1}
              contents={contentsForSurveyInContext1}
              shuffledEs={shuffledEsInContext1}
            />} />
          <Route exact path="/2" element={
            <Main 
              dataForContext={context2}
              contents={contentsForSurveyInContext2}
              shuffledEs={shuffledEsInContext2}
            />} />
          <Route exact path="/3" element={
            <Main 
              dataForContext={context3}
              contents={contentsForSurveyInContext3}
              shuffledEs={shuffledEsInContext3}
            />} />
          <Route exact path="/4" element={
            <Main 
              dataForContext={context4}
              contents={contentsForSurveyInContext4}
              shuffledEs={shuffledEsInContext4}
            />} />
          <Route exact path="/5" element={
            <Main 
              dataForContext={context5}
              contents={contentsForSurveyInContext5}
              shuffledEs={shuffledEsInContext5}
            />} />
          <Route exact path="/6" element={
            <Main 
              dataForContext={context6}
              contents={contentsForSurveyInContext6}
              shuffledEs={shuffledEsInContext6}
            />} />
        </Routes>
      </div>
    );
  }
  else
      return (<div></div>)
}

export default App;
