import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, makeStyles, useTheme } from '@material-ui/core';
import logo from 'Assets/images/logo.svg';
import GG_logo from 'Assets/home-img/gg-web-logo.svg';
import { H1, H6, Header } from 'Components';
import { PageSwitch } from 'Navigation';
import { AccountNav, DefaultNav } from 'Navigation/Paths';
import BackToTop from './Home/BackToTop';
import { getInstanceType } from 'Utils';
import { shallowEqual, useSelector } from 'react-redux';
import { INSTANCES_ID } from 'Constants/instance.config';

const useStyles = makeStyles((theme) => ({
  root: { backgroundColor: '#fff' },
  rootA: {
    // height: 'auto',
    fontSize: '1rem',
    width: '100%',
    minWidth: '284px',
    maxWidth: '100%',
    overflow: 'auto',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    // flexDirection: 'column',
    height: 'inherit',
    zIndex: 12,
    background: theme.palette.background.default,
    flexDirection: 'row',
    '@media(max-width:400px)': {
      fontSize: '0.9rem',
    },
  },
  prBox: {
    '@media(max-width:400px)': {
      margin: 'auto 20px',
      //  backgroundColor: 'blue!important',
    },
    '@media(min-width: 401px) and (max-width: 900px)': {
      margin: 'auto 80px',
      //backgroundColor: 'red!important',
      // maxWidth: '1200px',
    },
    '@media(min-width:901px)': {
      margin: '0 auto',
      maxWidth: '1200px',
      //backgroundColor: 'green!important',
    },
  },
  paraBox: {
    marginTop: '50px',
  },
  view: {
    minHeight: 'inherit',
    overflow: 'auto',
    flex: '1 1 auto',
    background: theme.palette.background.default,
  },
  mainLogoStyle: {
    backgroundSize: 'contain !important',
    margin: 'auto auto 24px auto',
    '@media(max-width:400px)': {
      width: '120px',
      height: '80px',
    },
    '@media(min-width: 401px) and (max-width: 900px)': {
      width: '130px',
      height: '100px',
    },
    '@media(min-width:901px)': {
      width: '150px',
      height: '120px',
    },
    background: `url(${logo}) no-repeat center`,
    cursor: 'pointer',
  },
  mainLogoStyleGG: {
    backgroundSize: 'contain !important',
    margin: 'auto auto 24px auto',
    '@media(max-width:400px)': {
      width: '180px',
      height: '80px',
    },
    '@media(min-width: 401px) and (max-width: 900px)': {
      width: '200px',
      height: '100px',
    },
    '@media(min-width:901px)': {
      width: '240px',
      height: '120px',
    },
    background: `url(${GG_logo}) no-repeat center`,
    cursor: 'pointer',
  },
  menuButton: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(2),
    '& .MuiButton-root': {
      color: theme.palette.text.icon,
      background: 'unset',
      width: '100px',
      margin: 0,
      padding: '0px',
      display: 'flex',
      justifyContent: 'start',
      opacity: '1',
      '&:hover': {
        boxShadow: 'unset',
        background: 'unset',
      },
      '&:active': {
        boxShadow: 'unset',
        opacity: '0.5',
      },
      '&:focus': {
        boxShadow: 'unset',
        opacity: '0.5',
      },
      '& .MuiButton-iconSizeMedium > *:first-child': {
        fontSize: '1.5rem',
      },
      '& .MuiTouchRipple-root': {
        display: 'none',
      },
    },
  },
}));

const PrivacyPolicy = () => {
  const { texts } = useTheme();
  const styles = useStyles();

  const scrollRef = useRef();
  const [showBackToTop, setShowBackToTop] = useState(false);

  const Inst_config = useSelector((state) => state.GetInstConfig.instConfig, shallowEqual);
  const isGlobalClimate = getInstanceType(Inst_config.instance_id, INSTANCES_ID.GLOBAL_CLIMATE_LITERACY_ID);

  const callback = (e) => {
    if (e === 'left-btn') {
      if (isGlobalClimate) {
        PageSwitch(AccountNav.SIGN_UP);
      } else {
        PageSwitch(DefaultNav.MAIN);
      }
    }
  };

  const headerSet = {
    showLeft: true,
    overrideLeftButton: true,
    callback,
    showRight: false,
    leftTitle: texts.BACK,
    notify: false,
  };

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const scrollEl = scrollRef.current;

    window.onresize = () => {
      scrollEl.scroll();
    };

    const handleScroll = () => {
      if (scrollEl.scrollTop > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    scrollEl.addEventListener('scroll', handleScroll);

    return () => {
      scrollEl.removeEventListener('scroll', handleScroll);
      window.onresize = null;
    };
  }, []);

  return (
    <>
      <Box className="full-height">
        <Header scrollToSection={scrollToSection} trigger="true" headerSet={headerSet} />
        <Box ref={scrollRef} className={`${styles.root} scroll`}>
          <Grid container className={styles.rootA}>
            <Grid item className={styles.view}>
              {' '}
              <Box className={styles.prBox}>
                <Box>
                  <Box display="flex" alignItems="center" justifyContent="center">
                    {isGlobalClimate ? (
                      <>
                        <div className={styles.mainLogoStyleGG}>&nbsp;</div>
                      </>
                    ) : (
                      <>
                        <div className={styles.mainLogoStyle}>&nbsp;</div>
                      </>
                    )}
                  </Box>
                  <H1 m={0} fontWeight="700" color="#112D70">
                    Privacy Policy
                  </H1>

                  <Box mb={2} textAlign="center">
                    <H6 color="#007BFF" fontWeight="500">
                      {isGlobalClimate ? <>Dated October 1, 2024</> : <>Last updated on: 19th December, 2023.</>}
                    </H6>

                    <hr />

                    {isGlobalClimate ? (
                      <>
                        {/* this is GCLC Privacy Policy text */}
                        <Box>
                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Introduction</strong>
                            <p>
                              Green Guardians is committed to safeguarding the privacy and personal data of competition participants,
                              parents, sponsors, and visitors to our website and our competitions and content platforms.
                            </p>
                            <p>
                              This Privacy Policy outlines how we collect, use, store, and protect personal information in relation to
                              the Global Climate Literacy Competitions.
                            </p>
                          </Box>
                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Restricted Application of Global Climate Literacy Competitions</strong>
                            <p>
                              Only schools (and students) that (1) accept our Privacy Policy and (2) are located in jurisdictions where
                              this policy complies with applicable national and regional data privacy and related laws and regulations
                              may enter the Global Climate Literacy Competitions.
                            </p>
                            <p>
                              By enrolling in the Global Climate Literacy Competitions, a school represents and warrants that (1) it
                              has accepted this Privacy Policy, (2) it is located in a jurisdiction where the Privacy Policy is
                              compliant with applicable national and regional data privacy and related laws and regulations, and (3) it
                              has obtained all necessary or appropriate consents for students to participate in the Global Climate
                              Literacy Competitions.
                            </p>
                          </Box>
                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Note on Student Personal Information </strong>
                            <p>
                              Please note that students may register with an alias name. We recommend the use of an alias for privacy
                              purposes. We also recommend schools maintain data on student identity behind an alias.
                            </p>
                            <p>
                              If a student registers with their real name, it will be visible to other participants on our competitions
                              and content platform, including in the individual rankings and the friends page.
                            </p>
                            <p>
                              Schools are responsible for determining consent requirements for their students and advising on the use
                              of aliases as needed
                            </p>
                            <p>
                              The only time when we will require the real names of students is, in the case of finalists only, when we
                              conduct the final stage of a competition series on a live or synchronous basis. We will work with the
                              relevant schools to ensure that necessary consents are secured.
                            </p>
                          </Box>
                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Information We Collect </strong>
                            <p>We may collect the following types of information:</p>
                            <ul>
                              <li>
                                <strong>Personal Information</strong>: Name, age, school, contact details (e.g., email, phone number),
                                nationality.
                              </li>
                              <li>
                                <strong>Parent/Guardian Information</strong>: For finalists only, names and contact details for consent
                                purposes.
                              </li>

                              <li>
                                <strong>Payment Information</strong>: If applicable, necessary details for processing registration
                                fees.
                              </li>
                              <li>
                                <strong>General Usage Data</strong>: IP address, browser type, and pages viewed, collected via cookies
                                or similar technologies.
                              </li>
                              <li>
                                <strong>Platform Usage Data</strong>: Engagement metrics such as competition participation,
                                performance, content creation, behavior, rankings, and rewards. purposes.
                              </li>
                            </ul>
                          </Box>
                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>How We Use Your Information </strong>
                            <p>The information we collect is used to: </p>
                            <ul>
                              <li>Manage participant registration and send competition-related communications.</li>
                              <li>Process payments and provide receipts, if applicable.</li>

                              <li>Display rankings and enable participants to compete with friends.</li>
                              <li>Share competition results with schools and participants.</li>
                              <li>
                                Communicate competition-related information, updates, sponsorship offers, and marketing promotions.
                              </li>
                            </ul>
                          </Box>
                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Data Sharing </strong>
                            <p>We respect privacy and do not share personal information with third parties, except: </p>
                            <ul>
                              <li>
                                <strong>Sponsors or internal use</strong>: Limited to school names, contact information, and finalists’
                                names and rankings for marketing communications.
                              </li>
                              <li>
                                <strong>Legal requirements</strong>: When necessary to comply with legal obligations.
                              </li>
                            </ul>
                          </Box>
                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Data Protection </strong>
                            <p>
                              We implement industry-standard security measures to prevent unauthorized access, alteration, disclosure,
                              or destruction of personal information. All personal and payment data is encrypted and securely
                              processed.
                            </p>
                          </Box>
                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Retention of Data </strong>
                            <p>
                              We retain personal information only for as long as needed to fulfil the purposes outlined in this policy
                              or as required by law.
                            </p>
                          </Box>
                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Your Rights </strong>
                            <p>Schools and participants have the following rights: </p>
                            <ul>
                              <li>
                                <strong>Access or deletion</strong>: Request access to or deletion of personal information
                              </li>
                              <li>
                                <strong>Withdrawal of consent</strong>: Opt out of receiving marketing communications at any time.
                              </li>

                              <li>
                                <strong>Correction requests</strong>: Request corrections for any inaccurate personal information
                              </li>
                            </ul>
                          </Box>
                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Contact Us </strong>
                            <p>
                              If you have questions or need assistance regarding this Privacy Policy, please contact us at
                              <a href="mailto:info@greenguardians.com" style={{ paddingLeft: '5px' }}>
                                <span data-contrast="none">info@greenguardians.com</span>
                              </a>
                            </p>
                          </Box>
                        </Box>
                      </>
                    ) : (
                      <>
                        {/* this is Bonzo Privacy Policy text */}
                        <Box>
                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <p>
                              Your privacy is important to Knowledge Platform Pte Ltd, a Singapore company (“Knowledge Platform”). This
                              Privacy Policy covers how we collect, use, disclose, transfer, and store your information. Please take a
                              moment to familiarize yourself with our privacy practices and let us know if you have any questions.
                            </p>
                          </Box>

                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Collection and Use of Personal Information</strong>
                            <p> Personal information is data that can be used to uniquely identify or contact a single person.</p>

                            <p>
                              You may be asked to provide your personal information anytime you are in contact with Knowledge Platform
                              or a Knowledge Platform affiliated company. Knowledge Platform and its affiliates may share this personal
                              information with each other and use this personal information on a basis consistent with this Privacy
                              Policy. They may also combine it with other information to provide and improve our products, services,
                              content, and advertising.
                            </p>

                            <p>
                              Here are some examples of the types of personal information Knowledge Platform may collect and how we may
                              use it.
                            </p>
                          </Box>

                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>What personal information we collect</strong>
                            <p>
                              When you create an Knowledge Platform ID, license or purchase any goods or services, download a software
                              update, register for a class through an application controlled or licensed by Knowledge Platform, or
                              participate in any online activity, we may collect a variety of information, including your name, mailing
                              address, phone number, email address, contact preferences, and credit card information.
                              <br />
                              We provide a range of interactive learning solutions, and through our web site located at
                              www.knowledgeplatform.com, and all associated sites linked to by www.knowledgeplatform.com by Knowledge
                              Platform, its subsidiaries and affiliates, and all other learning management systems and learning
                              community systems around the world managed or licensed by Knowledge Platform (collectively, the
                              &#8220;Site&#8221;) or otherwise, we gather or may in the future gather information relating to the
                              groups that you have joined, the connections that you have made, the courses you have taken, contributed
                              or created, the content you have reviewed, contributed or created, the assignments, assessments, surveys
                              and other activities you have completed, your performance in terms of many factors, including without
                              limitation, completion, progress, promptness, correctness, ranking, competency, and institutions with
                              which you are affiliated (all of the foregoing and any additional similar data, including any other data
                              related thereto that is described in the other paragraphs of this section is referred to as
                              &#8220;Learning Data&#8221;).
                              <br />
                              When you share your content with colleagues, family and friends using Knowledge Platform products, or
                              invite others to join you on Knowledge Platform forums, Knowledge Platform may collect the information
                              you provide about those people such as name, mailing address, email address, and phone number.
                            </p>
                          </Box>

                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>How we use your personal information:</strong>
                            <p>
                              The personal information we collect allows us to keep you posted on Knowledge Platform&#8217;s latest
                              product announcements, software updates, and upcoming events. It also helps us to improve our services,
                              content, and advertising. If you don&#8217;t want to be on our mailing list, you can opt out anytime by
                              updating your preferences.
                            </p>
                            <p>
                              When you register at the Site, we ask you to provide an e-­‐mail address and other personal information.
                              This information is available to any person who is also registered on the Site through your personal
                              profile. Under our Terms of Use, we require that registrants may use this personal information to contact
                              you directly through a Site, but unless you consent otherwise, registrants are restricted from using your
                              personal information outside of the activities conducted through the Site or for commercial purposes.
                              However, please note that we do not have any means of ensuring that the Terms of Use are complied with or
                              any obligation to enforce compliance. Please review our Agreement to Terms and Conditions of Use: by
                              accessing the Site you will agree to this Privacy Policy and will have waived rights and claims against
                              Knowledge Platform and will agree to indemnify us in respect of any loss or claim.
                            </p>
                            <p>
                              If your access to the Site has been paid for, required or sponsored by any institution or individual,
                              including without limitation a governmental or educational institution, foundation or non-­‐governmental
                              organization, corporation, trust or partnership, association, parent, family member or benefactor, then
                              that institution or individual will be provided with access to your personal data including your Learning
                              Data. Please review our Agreement to Terms and Conditions of Use: by accessing the Site you will agree to
                              this Privacy Policy and will have waived rights and claims against Knowledge Platform and will agree to
                              indemnify us in respect of any loss or claim.
                            </p>
                            <p>
                              If you have registered and accessed the Site on your own volition, but your access to enhanced content or
                              services, whether provided by us or by any other institution or individual, including without limitation
                              additional content, tutoring or teaching services, classroom access, provision of hardware, software or
                              access, has been paid for, required or sponsored by any institution or individual, including without
                              limitation a governmental or educational institution, foundation or non-­‐governmental organization,
                              corporation, trust or partnership, association, parent, family member or benefactor, then that
                              institution or individual will be provided with access to your personal data including your Learning
                              Data. We do not restrict how such institution or individual may use this personal information. Please
                              review our Agreement to Terms and Conditions of Use: by accessing the Site you will agree to this Privacy
                              Policy and will have waived rights and claims against Knowledge Platform and will agree to indemnify us
                              in respect of any loss or claim.
                            </p>
                            <p>
                              We also use personal information to help us develop, deliver, and improve our products, services,
                              content, and advertising.
                            </p>
                            <p>
                              From time to time, we may use your personal information to send important notices, such as communications
                              about purchases and changes to our terms, conditions, and policies. Because this information is important
                              to your interaction with Knowledge Platform, you may not opt out of receiving these communications.
                              <br />
                              We may also use personal information for internal purposes such as auditing, data analysis, and research
                              to improve Knowledge Platform&#8217;s products, services, and customer communications.
                              <br />
                              If you enter into a contest or other promotion we may use the information you provide to administer those
                              programs.
                            </p>
                            <p>
                              Notwithstanding the generality of the foregoing, any credit card and bank account information that we may
                              obtain from you is not shared with anyone except the applicable financial services firms and processing
                              agents and is not available for viewing on the Site.
                            </p>
                          </Box>

                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Collection and Use of Non-­‐Personal Information</strong>
                            <p>
                              We also collect non-­‐personal information − data in a form that does not permit direct association with
                              any specific individual. We may collect, use, transfer, and disclose non-­‐ personal information for any
                              purpose. The following are some examples of non-­‐personal information that we collect and how we may use
                              it:
                            </p>
                            <p>
                              We may collect information such as occupation, language, zip code, area code, unique device identifier,
                              location, and the time zone where a Knowledge Platform product or service is used so that we can better
                              understand customer behavior and improve our products, services, and advertising.
                              <br />
                              We also may collect information regarding customer activities on the Site. This information is aggregated
                              and used to help us provide more useful information to our customers and to understand which parts of our
                              website, products, and services are of most interest. Aggregated data is considered non-­‐personal
                              information for the purposes of this Privacy Policy.
                            </p>
                            <p>
                              If we do combine non-­‐personal information with personal information the combined information will be
                              treated as personal information for as long as it remains combined.
                            </p>
                          </Box>

                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Cookies and Other Technologies?</strong>

                            <p>
                              The Site, online services, interactive applications, email messages, and advertisements may use
                              &#8220;cookies&#8221; and other technologies such as pixel tags and web beacons. These technologies help
                              us better understand user behavior, tell us which parts of our website 4 people have visited, and
                              facilitate and measure the effectiveness of advertisements and web searches. We treat information
                              collected by cookies and other technologies as non-­‐ personal information. However, to the extent that
                              Internet Protocol (IP) addresses or similar identifiers are considered personal information by local law,
                              we also treat these identifiers as personal information. Similarly, to the extent that non-­‐personal
                              information is combined with personal information, we treat the combined information as personal
                              information for the purposes of this Privacy Policy.
                            </p>
                            <p>
                              Knowledge Platform and its partners may use cookies and other technologies in mobile advertising services
                              to control the number of times you see a given ad, deliver ads that relate to your interests, and measure
                              the effectiveness of ad campaigns. If you do not want to receive ads with this level of relevance on your
                              mobile device, you can opt out by e-­‐ mailing us at info@knowledgeplatform.com. If you opt out, you will
                              continue to receive the same number of mobile ads, but they may be less relevant because they will not be
                              based on your interests. You may still see ads related to the content on a web page or in an application
                              or based on other non-­‐personal information. This opt-­‐out applies only to Knowledge Platform
                              advertising services and does not affect interest-­‐based advertising from other advertising networks.
                            </p>
                            <p>
                              Knowledge Platform and our partners may also use cookies and other technologies to remember personal
                              information when you use our website, online services, and applications. Our goal in these cases is to
                              make your experience with Knowledge Platform more convenient and personal.
                            </p>
                            <p>
                              If you want to disable cookies, go to the preferences in your browser to disable cookies. Please note
                              that certain features of the Knowledge Platform website will not be available once cookies are disabled.
                            </p>
                            <p>
                              As is true of most websites, we gather some information automatically and store it in log files. This
                              information includes Internet Protocol (IP) addresses, browser type and language, Internet service
                              provider (ISP), referring and exit pages, operating system, date/time stamp, and clickstream data.
                            </p>
                            <p>
                              We use this information to understand and analyze trends, to administer the site, to learn about user
                              behavior on the site, and to gather demographic information about our user base as a whole. Knowledge
                              Platform may use this information in our marketing and advertising services.
                            </p>
                            <p>
                              In some of our email messages, we use a &#8220;click-­‐through URL&#8221; linked to content on the
                              Knowledge Platform website. When customers click one of these URLs, they pass through a separate web
                              server before arriving at the destination page on our website. We track this click-­‐through data to help
                              us determine interest in particular topics and measure the effectiveness of our customer communications.
                              If you prefer not to be tracked in this way, you should not click text or graphic links in the email
                              messages.
                            </p>
                            <p>
                              Pixel tags enable us to send email messages in a format customers can read, and they tell us whether mail
                              has been opened. We may use this information to reduce or eliminate messages sent to customers.
                            </p>
                          </Box>

                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Disclosure to Third Parties</strong>
                            <p>
                              At times Knowledge Platform may make certain personal information available to strategic partners that
                              work with Knowledge Platform to provide products and services, or that help Knowledge Platform market to
                              customers. Personal information will only be shared by Knowledge Platform to provide or improve our
                              products, services and advertising; it will not be shared with third parties for their marketing
                              purposes.
                            </p>
                          </Box>

                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Service Providers</strong>
                            <p>
                              Knowledge Platform may share personal information with companies who provide services such as information
                              processing, extending credit, fulfilling customer orders, delivering products to you, managing and
                              enhancing customer data, providing customer service, assessing your interest in our products and
                              services, and conducting customer research or satisfaction surveys. These companies are obligated to
                              protect your information and may be located wherever Knowledge Platform operates.
                            </p>
                          </Box>

                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Other Situations</strong>
                            <p>
                              It may be necessary − by law, legal process, litigation, and/or requests from public and governmental
                              authorities within or outside your country of residence − for Knowledge Platform to disclose your
                              personal information. We may also disclose information about you if we determine that for purposes of
                              national security, law enforcement, or other issues of public importance, disclosure is necessary or
                              appropriate.
                            </p>
                            <p>
                              We may also disclose information about you if we determine that disclosure is reasonably necessary to
                              enforce our terms and conditions or protect our operations or users. Additionally, in the event of a
                              reorganization, merger, or sale we may transfer any and all personal information we collect to the
                              relevant third party.
                            </p>
                          </Box>

                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Protection of Personal Information</strong>
                            <p>
                              Knowledge Platform takes precautions — including administrative, technical, and physical measures — to
                              safeguard your personal information against loss, theft, and misuse, as well as against unauthorized
                              access, disclosure, alteration, and destruction.
                            </p>
                            <p>
                              Knowledge Platform online services use Secure Sockets Layer (SSL) encryption on all web pages where
                              personal information is collected. To make purchases from these services, you must use an SSL-­‐enabled
                              browser such as Safari, Firefox, or Internet Explorer. Doing so protects the confidentiality of your
                              personal information while it&#8217;s transmitted over the Internet.
                            </p>
                            <p>
                              When you use some Knowledge Platform products, services, or applications or post on a Knowledge Platform
                              forum, chat room, or social networking service, the personal information you share is visible to other
                              users and can be read, collected, or used by them. You are responsible for the personal information you
                              choose to submit in these instances. For example, if you list your name and email address in a forum
                              posting, that information is public. Please take care when using these features.
                            </p>
                          </Box>

                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Integrity and Retention of Personal Information</strong>
                            <p>
                              Knowledge Platform makes it easy for you to keep your personal information accurate, complete, and up to
                              date. We will retain your personal information for the period necessary to fulfill the purposes outlined
                              in this Privacy Policy unless a longer retention period is required or permitted by law.
                            </p>
                          </Box>

                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Access to Personal Information</strong>
                            <p>
                              You can help ensure that your contact information and preferences are accurate, complete, and up to date
                              by logging in to your account at www.knowledgeplatform.com. For other personal information, we make good
                              faith efforts to provide you with access so you can request that we correct the data if it is inaccurate
                              or delete the data if Knowledge Platform is not required to retain it by law or for legitimate business
                              purposes. We may decline to process requests that are unreasonably repetitive, require disproportionate
                              technical effort, jeopardize the privacy of others, are extremely impractical, or for which access is not
                              otherwise required by local law. Access, correction, or deletion requests can be made to
                              info@knowledgeplatform.com.
                            </p>
                          </Box>

                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Location-­‐Based Services</strong>
                            <p>
                              To provide location-­‐based services on Knowledge Platform products, Knowledge Platform and our partners
                              and licensees may collect, use, and share precise location data. This location data is collected
                              anonymously in a form that does not personally identify you and is used by Knowledge Platform and our
                              partners and licensees to provide and improve location-­‐based products and services. For example, we may
                              share geographic location with application providers when you opt in to their location services.
                            </p>
                          </Box>

                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Third-­‐Party Sites and Services</strong>
                            <p>
                              To provide location-­‐based services on Knowledge Platform products, Knowledge Platform and our partners
                              and licensees may collect, use, and share precise location data. This location data is collected
                              anonymously in a form that does not personally identify you and is used by Knowledge Platform and our
                              partners and licensees to provide and improve location-­‐based products and services. For example, we may
                              share geographic location with application providers when you opt in to their location services.
                            </p>
                          </Box>

                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Our Commitment to Your Privacy</strong>
                            <p>
                              To make sure your personal information is secure, we communicate our privacy and security guidelines to
                              Knowledge Platform employees and strictly enforce privacy safeguards within the company.
                            </p>
                          </Box>

                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Privacy Questions</strong>
                            <p>
                              If you have any questions or concerns about our Privacy Policy or data processing, please contact us at
                              info@knowledgeplatform.com.
                            </p>
                          </Box>

                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>INCORPORATION INTO AGREEMENT TO TERMS AND CONDITIONS OF USE</strong>
                            <p>
                              THIS PRIVACY POLICY FORMS A PART OF AND HAS BEEN INTEGRATED BY REFERENCE TO KNOWLEDGE PLATFORM&#8217;S
                              AGREEMENT TO TERMS AND CONDITIONS OF USE. ALL OF THE PROVISIONS THEREOF, INCLUDING WITH RESPECT TO
                              DISCLAIMERS, LIMITATION OF LIABILITIES AND GOVERNING LAW PROVIDED THEREIN, APPLY TO THIS PRIVACY POLICY.
                            </p>
                            <p>
                              PLEASE READ AND REVIEW KNOWLEDGE PLATFORM&#8217;S AGREEMENT TO TERMS AND CONDITIONS OF USE. PLEASE ALSO
                              NOTE THAT KNOWLEDGE PLATFORM&#8217;S AGREEMENT TO TERMS AND CONDITIONS OF USE IS SUBJECT TO CHANGE
                              WITHOUT NOTICE.
                            </p>
                          </Box>

                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Change of Privacy Policy</strong>
                            <p>
                              Our Privacy Policy is subject to change without notice. All rights reserved. Knowledge Platform Pte Ltd,
                              Suite 1-­‐19, 314 Tanglin Road, Singapore 247977.
                            </p>
                          </Box>

                          <Box className={styles.backToTop}>
                            <BackToTop show={showBackToTop} scrollRef={scrollRef} />
                          </Box>

                          <Box className={styles.paraBox} color="#112D70" textAlign="left">
                            <strong>Update</strong>
                            <p>Last updated by Knowledge Platform on December 19, 2023.</p>
                          </Box>
                        </Box>
                      </>
                    )}

                    <Box style={{ height: '50px' }}>&nbsp;</Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default PrivacyPolicy;
