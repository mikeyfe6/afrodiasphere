// IMPORTS

declare module "*.png";
declare module "*.module.scss";

// API CONSTANTS

interface AdsApiProps {
    apiURL: string;
    token: string;
}

// PAGE CONSTANTS

interface AdsPageProps extends AdsApiProps {
    docId: string | null;
}

// USER CONSTANTS

interface AdsUserProps extends AdsApiProps {
    userId: number | null;
}

// LINKS CONSTANTS

interface LinkItem {
    documentId: string;
    title: string;
    url: string;
    visible: boolean;
}

// SOCIAL CONSTANTS

interface SocialProps {
    handleSmLinkChange: (platform: string, link: string) => void;
    loadingData: boolean;
}

// BIOGRAPHY

interface BiographyProps extends AdsPageProps {
    biography: string;
    setBiography: (value: string) => void;
    loadingData: boolean;
}

// ADDRESS

interface CoordinationProps {
    lat: number;
    lng: number;
}

interface LocationPin {
    location: string;
    latitude: number | null;
    longitude: number | null;
}

interface AddressProps extends AdsPageProps {
    preview: string;
    address: LocationPin;
    setAddress: (address: LocationPin) => void;
    setContactSuccess: (message: string | null) => void;
    setValidationMessage: (message: string | null) => void;
    loadingData: boolean;
}

// AVATAR

interface AvatarProps extends AdsPageProps {
    pageId: number | null;
    avatarId: number | null;
    preview: string;
    avatar: string | null;
    noavatar: string;
    setPreview: (preview: string) => void;
    setAvatar: (avatar: string | null) => void;
    setProfileSuccess: (message: string | null) => void;
    loadingData: boolean;
}

// MAIL

interface MailProps extends AdsPageProps {
    mail: string;
    setMail: (value: string) => void;
    setContactSuccess: (message: string | null) => void;
    setValidationMessage: (message: string | null) => void;
    loadingData: boolean;
}

// LINKS

interface LinksProps extends AdsPageProps {
    pageId: number | null;
    links: Array<LinkItem>;
    setLinks: React.Dispatch<React.SetStateAction<any[]>>;
}

// OCCUPATION

interface OccupationProps extends AdsPageProps {
    occupation: string;
    setOccupation: (value: string) => void;
}

// PROFILE

interface ProfileProps extends AdsPageProps {
    profile: string;
    setProfile: (value: string) => void;
    setProfileSuccess: (message: string | null) => void;
    setValidationMessage: (message: string | null) => void;
    loadingData: boolean;
}

// SLUG

interface SlugProps extends AdsPageProps {
    loadingData: boolean;
    slug: string;
    setSlug: (value: string) => void;
}

// TELEPHONE

interface TelephoneProps extends AdsPageProps {
    telephone: string;
    setTelephone: (value: string) => void;
    setContactSuccess: (message: string | null) => void;
    setValidationMessage: (message: string | null) => void;
    loadingData: boolean;
}

// TERMINATE

interface TerminateProps extends AdsPageProps {
    userId: number | null;
    links: { documentId: string }[];
    username: string;
    setValidationMessage: (message: string | null) => void;
}

// FACEBOOK

interface FacebookProps extends SocialProps {
    fbLink: string;
    setFbLink: React.Dispatch<React.SetStateAction<string>>;
}

// INSTAGRAM

interface InstagramProps extends SocialProps {
    igLink: string;
    setIgLink: React.Dispatch<React.SetStateAction<string>>;
}

// LINKEDIN

interface LinkedinProps extends SocialProps {
    liLink: string;
    setLiLink: React.Dispatch<React.SetStateAction<string>>;
}

// PATREON

interface PatreonProps extends SocialProps {
    paLink: string;
    setPaLink: (link: string) => void;
}

// PINTEREST

interface PinterestProps extends SocialProps {
    piLink: string;
    setPiLink: (link: string) => void;
}

// SNAPCHAT

interface SnapchatProps extends SocialProps {
    snLink: string;
    setSnLink: (link: string) => void;
}

// TIKTOK

interface TikTokProps extends SocialProps {
    tkLink: string;
    setTkLink: (link: string) => void;
}

// TWITTER

interface TwitterProps extends SocialProps {
    twLink: string;
    setTwLink: (link: string) => void;
}

// WHATSAPP
interface WhatsappProps extends SocialProps {
    waLink: string;
    setWaLink: (link: string) => void;
}

// YOUTUBE

interface YoutubeProps extends SocialProps {
    ytLink: string;
    setYtLink: (link: string) => void;
}

// EMAIL

interface EmailProps extends AdsUserProps {
    email: string;
    setEmail: (value: string) => void;
    setProfileSuccess: (message: string | null) => void;
    setValidationMessage: (message: string | null) => void;
    loadingData: boolean;
}

// PASSWORD

interface PasswordProps extends AdsUserProps {
    username: string;
    password: string;
    setPassword: (value: string) => void;
    setProfileSuccess: (message: string | null) => void;
    setValidationMessage: (message: string | null) => void;
}

// USERNAME

interface UsernameProps extends AdsUserProps {
    username: string;
    setUsername: (value: string) => void;
    setProfileSuccess: (message: string | null) => void;
    setValidationMessage: (message: string | null) => void;
    loadingData: boolean;
}

// LINK

interface AdsLinkProps {
    slug?: string;
    baseURL: string;
}

// PREVIEW

interface PreviewProps {
    preview: string;
    profile?: string;
    occupation?: string;
    biography?: string;
    telephone?: string;
    mail?: string;
    links: Array<LinkItem>;
    fbLink?: string;
    twLink?: string;
    igLink?: string;
    waLink?: string;
    tkLink?: string;
    liLink?: string;
    piLink?: string;
    snLink?: string;
    ytLink?: string;
    paLink?: string;
    color?: string;
    loadingData?: boolean;
}

// SIDEBAR

interface SidebarProps {
    profile: string;
    loadingData: boolean;
}

// THEMES

interface ThemesProps extends AdsPageProps {
    color: string;
    setColor: (color: string) => void;
}

// MOBILEMENU

interface MobileMenuProps {
    isMenuOpen: boolean;
    setMenuOpen: (isOpen: boolean) => void;
}

// FAQ

interface FAQItemProps {
    question: string;
    answer: string;
}

interface FAQWrapperProps {
    faqs: { question: string; answer: string }[];
}

// SLIDER

interface CarouselItem {
    id: number;
    avatar?: { url?: string };
    profile?: string;
    occupation?: string;
    biography?: string;
    slug?: string;
}

// MAPS

interface MarkerProps extends CoordinationProps {
    imageUrl?: string;
    onClick: () => void;
}

interface PinItem {
    address: {
        location: string;
        latitude: number;
        longitude: number;
    };
    latitude: number;
    longitude: number;
    location?: string;
    avatar?: {
        url: string;
    };
    profile?: string;
    slug?: string;
    biography?: string;
    occupation?: string;
    telephone?: string;
    email?: string;
    imageUrl?: string;
}

// USER

interface User {
    jwt?: string;
    [key: string]: any;
}

// SEO

interface SeoProps {
    description?: string;
    title: string;
    children?: React.ReactNode;
    pathname?: string;
    image?: string;
}

// SPINNER

interface SpinnerProps {
    type?: string;
}

// PAGE CONTEXT

interface PageContext {
    slug: string;
    documentId: string;
}

// SEO CONTEXT

interface SeoContext {
    profile: string;
    biography: string;
    slug: string;
    avatar?: { url: string };
}

// TODO: better naming...
