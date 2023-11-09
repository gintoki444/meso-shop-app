import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  iconSearch = '../../../../assets/icon/i-search.svg';
  iconCart = '../../../../assets/icon/i-cart.svg';

  iconHome = '../../../../assets/icon/i-home.svg';
  iconShop = '../../../../assets/icon/i-shop.svg';
  iconNotification = '../../../../assets/icon/i-notification.svg';
  iconAccount = '../../../../assets/icon/i-account.svg';

  constructor(
    private actionSheetController: ActionSheetController
  ) {}

  // Select action
  async selectAction() {

    const actionSheet = await this.actionSheetController.create({
      header: 'Choose an action',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'Add something',
          icon: 'wallet',
          handler: () => {
            // Put in logic ...
          }
        },
        {
          text: 'Change something',
          icon: 'swap-horizontal-outline',
          handler: () => {
            // Put in logic ...
          }
        },
        {
          text: 'Set something',
          icon: 'calculator',
          handler: () => {
            // Put in logic ...
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }]
    });
    await actionSheet.present();
  }
}
