const wikimediaFileUrl = (fileName: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=480`;

export const publicDomainBookCovers: Record<string, string> = {
  'Alicja w Krainie Czarow': wikimediaFileUrl(
    "Alice's Adventures in Wonderland cover (1865).jpg",
  ),
  Drakula: wikimediaFileUrl('Dracula-First-Edition-1897.jpg'),
  Frankenstein: wikimediaFileUrl('Frankenstein 1818 edition title page.jpg'),
  'Duma i uprzedzenie': wikimediaFileUrl('PrideAndPrejudiceTitlePage.jpg'),
  'Jane Eyre': wikimediaFileUrl('1931 Jane Eyre.jpg'),
  Krzyzacy: wikimediaFileUrl(
    'Krzyzacy - powiesc historyczna 1900 (94014839)..jpg',
  ),
  'Pan Tadeusz': wikimediaFileUrl('Pan Tadeusz 1834.jpeg'),
  'Quo Vadis': wikimediaFileUrl(
    'Quo vadis - a narrative of the time of Nero. Vol. 1 1897 (60752999).jpg',
  ),
};
