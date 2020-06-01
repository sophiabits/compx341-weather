module.exports = {
    '@disabled': false,  // This will prevent the test module from running.

    after: (browser, done) => {
      console.log('After called');
      browser
        .closeWindow()
        .end(done);
    },

    'Navigate to the DemoDOI - valid city name': async (browser) => {
      const demodoi = browser.page.demodoi();
      const { cityName } = demodoi.section;

      await demodoi.navigate().waitForElementVisible('@inputText');

      await demodoi.setValue('@inputText', [
        'hamilton',
        browser.Keys.ENTER
      ]);

      await demodoi.waitForElementVisible('@table');

      cityName.expect.element('@firstApp').text.to.equal('Hamilton');
    },

    'Navigate to the DemoDOI - invalid city name': async (browser) => {
      const demodoi = browser.page.demodoi();

      await demodoi.navigate().waitForElementVisible('@inputText');

      await demodoi.setValue('@inputText', [
        'auckj',
        browser.Keys.ENTER
      ]);

      await demodoi.waitForElementNotPresent('@table');

      demodoi.expect.element('@cityNotFound').text.to.equal('city not found');
    },

    // 'Navigate to the DemoDOI - invalid input': async (browser) => {
    //   const demodoi = browser.page.demodoi();

    //   await demodoi.navigate().waitForElementVisible('@inputText');

    //   await demodoi.setValue('@inputText', [
    //     'ABCDE',
    //     browser.Keys.ENTER
    //   ]);

    //   await demodoi.waitForElementNotPresent('@table');

    //   demodoi.expect.element('@invalidCity').text.to.equal('* should be a 5 digit number only');
    // },
};
