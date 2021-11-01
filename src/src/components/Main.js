import React, { useRef, useEffect } from "react";
import * as d3 from 'd3';
import * as Survey from "survey-react";
import "survey-react/modern.css";

// Survey settings
Survey.StylesManager.applyTheme("modern");
Survey.surveyStrings.savingData = "Please wait. We are validating and saving your response.";
Survey.surveyStrings.savingDataError = "That is my own text on error.";
Survey.surveyStrings.savingDataSuccess = "That is my own text on success.";
Survey.surveyStrings.saveAgainButton = "Try to save again.";

const Main = ({
  contents,
  contentsFromSurveyJs
}) => {
  const ref = useRef(null);

  useEffect(() => {
    d3.select('#sp_102').select('.sv-page').append('div').lower();
    // console.log('getattr: ', d3.selectAll('.sv-question').filter(d => d['name']=='featureTable'))
  });

  let survey = new Survey.Model(contentsFromSurveyJs);
  

  // survey.onComplete.add(function (sender) {
  //   console.log('select surveyResult: ', document.querySelector("#surveyResult"))
  //   document.querySelector("#surveyResult").textContent =
  //     "Result JSON:\n" + JSON.stringify(sender.data, null, 3);
  // });

  function sendDataToServer(survey) {
    survey.sendResult('21c9eb9a-0641-4371-8dea-e9309c7850b8');
  }

  survey.surveyShowDataSaving = true;
  survey.getPlainData({ calculations: [{ propertyName: "tag" }] });

  survey.onUpdatePanelCssClasses.add(function (survey, options, i) {
    let classes = options.cssClasses.panel;

    console.log("custom css-class added: ", options.panel.name);
    console.log("option for panel: ", options);

    if (options.panel.name == 'panelExpRanking') {
      classes.content += " displayFlex";
    }

    if (options.panel.name == 'panelRanking') {
      classes.content += " floatRight width30";
    }
    
  });

  survey.onUpdateQuestionCssClasses.add(function (survey, options, i) {
    let classes = options.cssClasses;

    console.log("custom css-class added: ", options.question.name);
    console.log("option: ", options);

    classes.mainRoot += " " + options.question.name;
    classes.mainRoot += " sv_qstn";
    classes.root = "sq-root";
    classes.title += " sq-title";
    classes.item += " sq-item";
    classes.label += " sq-label";

    if ((options.question.getType() == 'radiogroup') || (options.question.getType() == 'checkbox')) {
      classes.column += " displayBlock paddingLeft50 maxWidth40";
      classes.item += " textAlignLeft";
    }

    if (options.question.getType() == 'matrix') {
      classes.content += " width90";
      classes.cellHeader += " maxWidth50px"
      classes.cell += " minWidth10px"
      classes.headerCell += " maxWidth50px"
    }

    if (options.question.name == 'decisionMakingStyle') {
      classes.cell += " paddingLeft1";
    }

    if (options.question.name == 'scenarioDescription') {
      // classes.mainRoot += " backgroundColorLightGray";
    }

    if (options.question.name == 'explanationStrategies') {
      classes.cellText += " textAlignLeft";
    }

    if (options.question.name == 'explanationDisplay') {
      classes.mainRoot += " floatLeft width40 positionFixed";
      classes.cellText += " textAlignLeft";
    }

    // if (options.question.isRequired) {
    //   classes.title += " sq-title-required";
    //   classes.root += " sq-root-required";
    // }

    // if (options.question.getType() === "checkbox") {
    //   classes.root += " sq-root-cb";
    // }
  });

  console.log('survey data: ', survey.data);

  survey
    .onComplete
    .add((sender) => {
        let survey = sender;
        let surveyData = sender.data;
        surveyData.info = { dd: 'ddd' }
        console.log('sender: ', sender.data)
        sender.data = {ddddddd: 'ddddddd'}
        survey.sendResult('21c9eb9a-0641-4371-8dea-e9309c7850b8');
    });

  return (
    <div className="App">
      <Survey.Survey model={survey} ref={ref} />
    </div>
  );
}

export default Main;
