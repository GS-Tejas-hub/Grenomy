export function createPageUrl(pageName) {
  switch (pageName) {
    case 'Home':
      return '/';
    case 'Products':
      return '/products';
    case 'AboutUs':
      return '/about-us';
    case 'Contact':
      return '/contact';
    default:
      return '/';
  }
}


