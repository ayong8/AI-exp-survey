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
  let timeEl = document.getElementById("timeEl");
  let timerId = null;
  let timeRecord = {};

  const renderTime = (val) => {
    if(!timeEl) return;
    let hours = Math.floor(val / 3600);
    let minutes = Math.floor((val - (hours*3600)) / 60);
    let seconds = Math.floor(val % 60);
    let timeText = hours + ":" + minutes + ":" + seconds;
    timeEl.innerHTML = timeText;
  }

  const timerCallback = () => {
    let page = survey.currentPage;
    if(!page) return;
    let valueName = "pageNo" + survey.pages.indexOf(page);
    let seconds = survey.getValue(valueName);
    if(seconds == null) seconds = 0;
    else seconds ++;
    survey.setValue(valueName, seconds);
    
    timeRecord[valueName] = seconds;
    renderTime(seconds)
  }

  timerCallback();
  timerId = window.setInterval(function(){
    timerCallback();
  }, 1000);

  survey.onCurrentPageChanged.add(function(){
    timerCallback();
  });

  survey.surveyShowDataSaving = true;
  survey.onUpdatePanelCssClasses.add(function (survey, options, i) {
    let classes = options.cssClasses.panel;
    console.log('options.panel.name: ', options.panel.name)

    if ((options.panel.name == 'panelExpRanking1') || (options.panel.name == 'panelExpRanking2')) {
      classes.content += " displayFlex";
    }

    if ((options.panel.name == 'panelRanking1') || (options.panel.name == 'panelRanking2')) {
      classes.content += " floatRight overflowYScroll maxHeight500";
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
    } else if ((options.question.name == 'education') || (options.question.name == 'age') || (options.question.name == 'occupation')) {
      classes.item += " displayBlock paddingLeft50 maxWidth40 textAlignLeft";
    } else if (options.question.name == 'decisionMakingStyle') {
      classes.cell += " paddingLeft1";
    } else if (options.question.name == 'explanationStrategies') {
      classes.cellText += " textAlignLeft";
    } else if ((options.question.name == 'explanationDisplay1') || (options.question.name == 'explanationDisplay2')) {
      classes.mainRoot += " floatLeft";
      classes.cellText += " textAlignLeft";
    } else if (options.question.name == 'featureTable') {
      classes.cell += ""
    }

    // by type
    if (options.question.getType() == 'checkbox') {
      classes.item += " displayBlock paddingLeft50 maxWidth40 textAlignLeft";
    } else if (options.question.getType() == 'matrix') {
      classes.content += " width90";
      classes.cell += " minWidth20px padding5px"
      classes.headerCell += " maxWidth50px padding5px"
    } else if (options.question.getType() == 'comment') {
      classes.root += " maxWidth300px" 
      console.log(options.question.getType())
    }
  });

  survey
    .onComplete
    .add((result) => {
        let surveyResult = result['data'];

        surveyResult['context'] = dataForContext;
        surveyResult['explanations'] = shuffledEs;
        surveyResult['expMapping'] = shuffledEs.map(e => _.pick(e, ['idx', 'name']));
        surveyResult['timeSpent'] = timeRecord;
        result['data'] = surveyResult;
        
        clearInterval(timerId);
        result.sendResult(dataForContext.surveyPostId);
    })

  survey
    .onSendResult
    .add((sender, options) => {
      if (options.success) {
        window.location.href = "https://app.prolific.co/submissions/complete?cc=6CB630BD";
      }
    });

  return (
    <div className="App">
      <Survey.Survey model={survey} ref={ref} />
    </div>
  );
}

export default Main;
