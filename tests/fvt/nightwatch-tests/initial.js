module.exports = {
    '@disabled': false,  // This will prevent the test module from running.

    after: (browser, done) => {
      // console.log('After called');
      browser
        .closeWindow()
        .end(done);
    },

    'DemoDOI - input is automatically focused on page load': async (browser) => {
      const demodoi = browser.page.demodoi();
      await demodoi.navigate().waitForElementVisible('@inputText');

      // eslint-disable-next-line no-unused-expressions
      demodoi.expect.element('@inputText').to.be.active;
    },

    'DemoDOI - contains a google maps instance, and clicking it fires a request to the weather API': async (browser) => {
      const demodoi = browser.page.demodoi();

      await browser.click('@map');

      await demodoi.waitForElementVisible('@table');
    },

    'Navigate to the DemoDOI - valid city name': async (browser) => {
      const demodoi = browser.page.demodoi();
      const { cityName } = demodoi.section;

      const cases = [
        // [entered_text, displayed_text]
        ['hamilton', 'Hamilton'],
        ['weLLington', 'Wellington'],
        ['Auckland', 'Auckland'],
      ];

      for (let [input, displayed] of cases) {
        await demodoi.navigate().waitForElementVisible('@inputText');

        await demodoi.setValue('@inputText', [
          input,
          browser.Keys.ENTER
        ]);

        await demodoi.waitForElementVisible('@table');

        cityName.expect.element('@firstApp').text.to.equal(displayed);
      }
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
