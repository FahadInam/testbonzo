const path_titles = {
  '/reward-history': { title: 'Reward History' },
  '/rewards': { title: 'Rewards', root: true },
  '/lesson_listing': { title: 'Lessons' },
  '/game_list': { title: 'My Games' },
  '/my_games': { title: 'My Games' },
  '/chat': { title: 'Chat' },
  '/games': { title: 'Games' },
  '/lesson': { title: 'Lessons' },
  '/friends': { title: 'Friends', root: true },
  '/leaderboard': { title: 'Leaderboard', root: true },
  '/result': { title: 'Result' },
  '/stats': { title: 'Stats' },
  '/change-grade': { title: 'Level Selection', root: true },
  '/settings': { title: 'Profile' },
  '/faqs': { title: 'Frequently Asked Questions' },
  '/payment': { title: 'Buy Premium Account' },
  '/payment_result': { title: 'Buy Premium Account' },
  '/support_center': { title: 'Support Center' },
  '/easypaisa_payment': { title: 'Support Chat' },
  '/challenge/': { title: 'Challenge' },
  '/competitions/': { title: 'Home', root: true },
  '/competitions': { title: 'Competitions' },
};

const DocumentTitleSetter = (pathname, siteConfig) => {
  const base_string = ` - ${siteConfig?.page_title}`;
  const default_string = `${siteConfig?.page_title}`;

  var updated_title = default_string;
  var is_root = false;
  for (var key in path_titles) {
    if (pathname.indexOf(key) > -1) {
      updated_title = path_titles[key].title + base_string;
      is_root = path_titles[key].root === true;
      break;
    }
  }

  window.document.title = updated_title;

  if (window.IS_MCD_APP === 1) {
    var user = window.mcd.bridge.message('appBar');
    user.send({
      appBarTitle: updated_title,
      appBarBackButtonName: 'Back',
    });

    if (!is_root) {
      window.MCD_MOVE_BACK = 0;
      window.IS_CURRENT_ROOT = 0;
    } else {
      window.IS_CURRENT_ROOT = 1;
    }
  }
};

export { DocumentTitleSetter };
