import React, { useRef, useEffect } from "react";
import _ from 'lodash';
import * as d3 from 'd3';
import * as Survey from "survey-react";
import "survey-react/modern.css";

// Survey settings
Survey.StylesManager.applyTheme("modern");
Survey.surveyStrings.savingData = "Please wait. We are validating and saving your response.";
Survey.surveyStrings.savingDataError = "That is my own text on error.";
Survey.surveyStrings.savingDataSuccess = "Success!";
Survey.surveyStrings.saveAgainButton = "Try to save again.";

const Main = ({
  contents,
  dataForContext,
  shuffledEs
}) => {
  const ref = useRef(null);
  let survey = new Survey.Model(contents);


  survey.surveyShowDataSaving = true;
  survey.onUpdatePanelCssClasses.add(function (survey, options, i) {
    let classes = options.cssClasses.panel;
    console.log('options.panel.name: ', options.panel.name)

    if ((options.panel.name == 'panelExpRanking1') || (options.panel.name == 'panelExpRanking2')) {
      classes.content += " displayFlex";
    }

    if ((options.panel.name == 'panelRanking1') || (options.panel.name == 'panelRanking2')) {
      classes.content += " floatRight width55";
    }
    
  });

  survey.onUpdateQuestionCssClasses.add(function (survey, options, i) {
    let classes = options.cssClasses;

    console.log("options.question.name: ", options.question.name);

    classes.mainRoot += " " + options.question.name;
    classes.mainRoot += " sv_qstn";
    classes.root = "sq-root";
    classes.title += " sq-title";
    classes.item += " sq-item";
    classes.label += " sq-label";

    // by name
    if (options.question.name == 'gender') {
      classes.column += " displayBlock paddingLeft50 maxWidth40";
      classes.item += " textAlignLeft";
    } else if (options.question.name == 'education') {
      classes.item += " displayBlock paddingLeft50 maxWidth40 textAlignLeft";
    } else if (options.question.name == 'decisionMakingStyle') {
      classes.cell += " paddingLeft1";
    } else if (options.question.name == 'explanationStrategies') {
      classes.cellText += " textAlignLeft";
    } else if ((options.question.name == 'explanationDisplay1') || (options.question.name == 'explanationDisplay2')) {
      classes.mainRoot += " floatLeft width40 positionFixed overflowYScroll height600";
      classes.cellText += " textAlignLeft";
    } else if (options.question.name == 'featureTable') {
      classes.cell += ""
    }

    // by type
    if (options.question.getType() == 'checkbox') {
      classes.item += " displayBlock paddingLeft50 maxWidth40 textAlignLeft";
    } else if (options.question.getType() == 'matrix') {
      classes.content += " width90";
      classes.cell += " minWidth100px padding5px"
      classes.headerCell += " maxWidth50px padding5px"
    }
  });

  survey
    .onComplete
    .add((result) => {
        let surveyResult = result['data']
        surveyResult['expMapping'] = shuffledEs.map(e => _.pick(e, ['idx', 'name']))
        result['data'] = surveyResult;
        result.sendResult(dataForContext.surveyPostId);
    });

  return (
    <div className="App">
      <Survey.Survey model={survey} ref={ref} />
    </div>
  );
}

export default Main;
