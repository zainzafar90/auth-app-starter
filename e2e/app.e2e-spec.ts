import { AuthAppStarterPage } from './app.po';

describe('auth-app-starter App', function() {
  let page: AuthAppStarterPage;

  beforeEach(() => {
    page = new AuthAppStarterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
