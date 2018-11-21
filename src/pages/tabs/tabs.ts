import { Component } from '@angular/core';
import { HappinesssurveyPage } from '../happinesssurvey/happinesssurvey';
import { GratitudejournalPage } from '../gratitudejournal/gratitudejournal';
import { MoodloggingPage } from '../moodlogging/moodlogging';
import { HomePage } from '../home/home';
import { MediaPage } from '../media/media';
import { Visualized3Page } from '../visualized3/visualized3';
import { ProfilePage } from '../profile/profile'

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MoodloggingPage;
  tab3Root = Visualized3Page;
  tab4Root = HappinesssurveyPage;
  tab5Root = GratitudejournalPage;
  tab6Root = MediaPage;
  tab7Root = ProfilePage;
  tabcolor= "primary";
  constructor() {

  }
}
