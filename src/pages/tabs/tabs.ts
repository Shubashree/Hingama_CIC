import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HappinesssurveyPage } from '../happinesssurvey/happinesssurvey';
import { GratitudejournalPage } from '../gratitudejournal/gratitudejournal';
import { MoodloggingPage } from '../moodlogging/moodlogging';
import { HomePage } from '../home/home';
@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MoodloggingPage;
  tab3Root = AboutPage;
  tab4Root = HappinesssurveyPage;
  tab5Root = GratitudejournalPage;
  tabcolor= "primary";
  constructor() {

  }
}
