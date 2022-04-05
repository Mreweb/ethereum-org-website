import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXProvider } from "@mdx-js/react"
import styled from "styled-components"

import ButtonLink from "../components/ButtonLink"
import ButtonDropdown from "../components/ButtonDropdown"
// import BannerNotification from "../components/BannerNotification"
import Card from "../components/Card"
import ExpandableCard from "../components/ExpandableCard"
import DocLink from "../components/DocLink"
// import Icon from "../components/Icon"
import Contributors from "../components/Contributors"
import InfoBanner from "../components/InfoBanner"
import UpgradeStatus from "../components/UpgradeStatus"
import Link from "../components/Link"
import MarkdownTable from "../components/MarkdownTable"
import Logo from "../components/Logo"
import MeetupList from "../components/MeetupList"
import PageMetadata from "../components/PageMetadata"
import Pill from "../components/Pill"
import RandomAppList from "../components/RandomAppList"
import Roadmap from "../components/Roadmap"
import UpgradeTableOfContents from "../components/UpgradeTableOfContents"
import TableOfContents from "../components/TableOfContents"
import TranslationsInProgress from "../components/TranslationsInProgress"
// import Translation from "../components/Translation"
import FeedbackCard from "../components/FeedbackCard"
import SectionNav from "../components/SectionNav"
import {
  Divider,
  Paragraph,
  Header1,
  Header4,
  InfoGrid,
} from "../components/SharedStyledComponents"
import Emoji from "../components/Emoji"
import YouTube from "../components/YouTube"
import LaunchpadWidget from "../components/LaunchpadWidget"
import Breadcrumbs from "../components/Breadcrumbs"
import StakingProductsCardGrid from "../components/StakingProductsCardGrid"
import StakingComparison from "../components/StakingComparison"
import HowSoloStakingWorks from "../components/HowSoloStakingWorks"
import StakingConsiderations from "../components/StakingConsiderations"
import StakingCommunityCallout from "../components/StakingCommunityCallout"

import { isLangRightToLeft } from "../utils/translations"

const Page = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto 4rem;

  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 4rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const InfoColumn = styled.aside`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 6.25rem; /* account for navbar */
  height: calc(100vh - 80px);
  flex: 0 1 330px;
  margin: 0 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const MobileButton = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    background: ${(props) => props.theme.colors.background};
    box-shadow: 0 -1px 0px ${(props) => props.theme.colors.border};
    width: 100%;
    bottom: 0;
    position: sticky;
    padding: 2rem;
    z-index: 99;
    margin-bottom: 0rem;
  }
`

// Apply styles for classes within markdown here
const ContentContainer = styled.article`
  flex: 1 1 ${(props) => props.theme.breakpoints.l};
  position: relative;
  padding: 2rem;
  padding-top: 0rem;

  h2:first-of-type {
    margin-top: 0;
  }

  .featured {
    padding-left: 1rem;
    margin-left: -1rem;
    border-left: 1px dotted ${(props) => props.theme.colors.primary};
  }

  .citation {
    p {
      color: ${(props) => props.theme.colors.text200};
    }
  }
`

const Pre = styled.pre`
  max-width: 100%;
  overflow-x: scroll;
  background-color: ${(props) => props.theme.colors.preBackground};
  border-radius: 0.25rem;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.preBorder};
  white-space: pre-wrap;
`

const InfoTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  text-align: right;
  margin-top: 0rem;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    text-align: left;
    font-size: 2.5rem
    display: none;
  }
`

const H2 = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-top: 4rem;

  a {
    display: none;
  }

  /* Anchor tag styles */

  a {
    position: relative;
    display: initial;
    opacity: 0;
    margin-left: -1.5em;
    padding-right: 0.5rem;
    font-size: 1rem;
    vertical-align: middle;
    &:hover {
      display: initial;
      fill: ${(props) => props.theme.colors.primary};
      opacity: 1;
    }
  }

  &:hover {
    a {
      display: initial;
      fill: ${(props) => props.theme.colors.primary};
      opacity: 1;
    }
  }
`

const H3 = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;

  a {
    display: none;
  }

  /* Anchor tag styles */

  a {
    position: relative;
    display: initial;
    opacity: 0;
    margin-left: -1.5em;
    padding-right: 0.5rem;
    font-size: 1rem;
    vertical-align: middle;
    &:hover {
      display: initial;
      fill: ${(props) => props.theme.colors.primary};
      opacity: 1;
    }
  }

  &:hover {
    a {
      display: initial;
      fill: ${(props) => props.theme.colors.primary};
      opacity: 1;
    }
  }
`

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(min(100%, 280px), 1fr));
  @media (max-width: ${(props) => props.theme.breakpoints.xl}) {
    grid-template-columns: minmax(min(100%, 280px), 1fr);
  }
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    grid-template-columns: repeat(3, minmax(min(100%, 280px), 1fr));
  }
  @media (max-width: ${(props) => props.theme.breakpoints.m}) {
    grid-template-columns: minmax(min(100%, 280px), 1fr);
  }
  gap: 2rem;
  h3 {
    margin-top: 0;
  }
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-top: 1rem;
`

const SummaryPoint = styled.li`
  color: ${(props) => props.theme.colors.text300};
`

const StyledButtonDropdown = styled(ButtonDropdown)`
  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-end;
  text-align: center;
  @media (min-width: ${(props) => props.theme.breakpoints.s}) {
    align-self: flex-end;
  }
`

const MobileButtonDropdown = styled(StyledButtonDropdown)`
  margin-bottom: 0rem;
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const Container = styled.div`
  position: relative;
`

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  --height: 500px;
  max-height: var(--height);
  min-height: var(--height);
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
    max-height: 100%;
    padding-left: 0;
    padding-right: 0;
  }
`

const Image = styled(GatsbyImage)`
  flex: 1 1 100%;
  background-repeat: no-repeat;
  right: 0;
  bottom: 0;
  max-width: 400px;
  @media (max-width: ${({ theme }) => theme.breakpoints.l}) {
    width: 100%;
    height: 100%;
    max-height: 340px;
    max-width: min(400px, 98%);
    overflow: initial;
    align-self: center;
    margin: 0;
  }
`

const MobileTableOfContents = styled(TableOfContents)`
  position: relative;
  z-index: 2;
`

const TitleCard = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`

// Note: you must pass components to MDXProvider in order to render them in markdown files
// https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#mdxprovider
const components = {
  a: Link,
  h1: Header1,
  h2: H2,
  h3: H3,
  h4: Header4,
  p: Paragraph,
  pre: Pre,
  table: MarkdownTable,
  MeetupList,
  RandomAppList,
  Roadmap,
  Logo,
  ButtonLink,
  Contributors,
  InfoBanner,
  Card,
  CardGrid,
  InfoGrid,
  Divider,
  SectionNav,
  Pill,
  TranslationsInProgress,
  Emoji,
  UpgradeStatus,
  DocLink,
  ExpandableCard,
  YouTube,
  LaunchpadWidget,
  StakingProductsCardGrid,
  StakingComparison,
  HowSoloStakingWorks,
  StakingConsiderations,
}

const StakingPage = ({ data, pageContext, location }) => {
  const mdx = data.pageData
  const isRightToLeft = isLangRightToLeft(mdx.frontmatter.lang)
  const tocItems = mdx.tableOfContents.items
  const { summaryPoints } = mdx.frontmatter

  // const { editContentUrl } = data.siteData.siteMetadata
  // const { relativePath } = pageContext
  // const absoluteEditPath = `${editContentUrl}${relativePath}`

  const dropdownLinks = {
    text: "Staking Options",
    ariaLabel: "Staking options dropdown menu",
    items: [
      {
        text: "Staking Home",
        to: "/staking",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked staking home",
        },
      },
      {
        text: "Solo staking",
        to: "/staking/solo",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked solo staking",
        },
      },
      {
        text: "Staking as a service",
        to: "/staking/saas",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked staking as a service",
        },
      },
      {
        text: "Pooled staking",
        to: "/staking/pools",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked pooled staking",
        },
      },
    ],
  }

  return (
    <Container>
      <HeroContainer>
        <TitleCard>
          <Breadcrumbs slug={location.pathname} />
          <Title>{mdx.frontmatter.title}</Title>
          <ul>
            {summaryPoints.map((point, idx) => (
              <SummaryPoint key={idx}>{point}</SummaryPoint>
            ))}
          </ul>
          <MobileTableOfContents
            items={tocItems}
            maxDepth={mdx.frontmatter.sidebarDepth}
            isMobile={true}
          />
        </TitleCard>
        <Image
          image={getImage(mdx.frontmatter.image)}
          alt={mdx.frontmatter.alt}
          objectFit="contain"
        />
      </HeroContainer>
      <Page dir={isRightToLeft ? "rtl" : "ltr"}>
        <PageMetadata
          title={mdx.frontmatter.title}
          description={mdx.frontmatter.description}
        />
        <InfoColumn>
          <StyledButtonDropdown list={dropdownLinks} />
          <InfoTitle>{mdx.frontmatter.title}</InfoTitle>

          {mdx.frontmatter.sidebar && tocItems && (
            <UpgradeTableOfContents
              items={tocItems}
              maxDepth={mdx.frontmatter.sidebarDepth}
            />
          )}
        </InfoColumn>
        <ContentContainer id="content">
          <MDXProvider components={components}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
          <StakingCommunityCallout />
          <FeedbackCard prompt="Was this page helpful?" />
        </ContentContainer>
        <MobileButton>
          <MobileButtonDropdown list={dropdownLinks} />
        </MobileButton>
      </Page>
    </Container>
  )
}

export const stakingPageQuery = graphql`
  query StakingPageQuery($relativePath: String) {
    siteData: site {
      siteMetadata {
        editContentUrl
      }
    }
    pageData: mdx(fields: { relativePath: { eq: $relativePath } }) {
      fields {
        slug
      }
      frontmatter {
        title
        description
        lang
        sidebar
        emoji
        sidebarDepth
        summaryPoints
        alt
        image {
          childImageSharp {
            gatsbyImageData(
              width: 500
              layout: CONSTRAINED
              placeholder: BLURRED
              quality: 100
            )
          }
        }
      }
      body
      tableOfContents
      parent {
        ... on File {
          mtime
          fields {
            gitLogLatestDate
          }
        }
      }
    }
  }
`

export default StakingPage