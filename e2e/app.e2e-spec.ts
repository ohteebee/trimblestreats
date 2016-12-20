import { TrimblestreatsPage } from './app.po';

describe('trimblestreats App', function() {
  let page: TrimblestreatsPage;

  beforeEach(() => {
    page = new TrimblestreatsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
