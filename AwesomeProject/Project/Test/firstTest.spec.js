describe('Example', function() {

  this.timeout(0);
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('tests that the backwards button is visible', async () => {
    await expect(element(by.id('backwardsButton'))).toBeVisible();
  });
  it('tests that the forwards button is visible', async () => {
    await expect(element(by.id('forwardsButton'))).toBeVisible();
  });
  it('makes sure all movies kan be displayed', async () => {
    var id = 0;
   //5175/4 = 1 293,75. Number of items in data divided by number of items per view
    for(var i = 0; i < 5172; i+=4) {

     for(var j = 0; j < 4; j++) {
      id = i+j;
      id = id.toString();
      await expect(element(by.id(id))).toBeVisible();//.toBeVisible(); //Check that all 4 movie items are visible
      await element(by.id((id).toString())).tap(); //Tap each movie item
      await expect(element(by.id("modal"+id))).toBeVisible();

     }
     await element(by.id('forwardsButton')).tap();
    }
  });
});
