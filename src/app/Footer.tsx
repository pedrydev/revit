import { Link as MuiLink, Toolbar, Typography } from '@mui/material';

import Link from '@/common/navigation/Link';

interface FooterInfoItem {
  label: string;
  link: string;
}

interface FooterInfoProps {
  header: string;
  items: FooterInfoItem[];
}

function FooterInfo({ header, items }: FooterInfoProps) {
  return (
    <section className='flex flex-col space-y-1.5'>
      <Typography component='header' variant='body1'>
        {header}
      </Typography>
      {items.map((item) => (
        <Link key={item.link} href={item.link} sx={{ color: 'white' }} variant='body2'>
          {item.label}
        </Link>
      ))}
    </section>
  );
}

export default function Footer() {
  return (
    <Toolbar className='bg-slate-800 py-1.5 text-white' component='footer'>
      <div className='space-y-3 w-full'>
        <div className='flex justify-around'>
          <FooterInfo
            header='About us'
            items={[
              { label: 'Company info 1', link: '/about/info1' },
              { label: 'Company info 2', link: '/about/info2' },
              { label: 'Company info 3', link: '/about/info3' },
            ]}
          />
          <FooterInfo
            header='Products'
            items={[
              { label: 'Company product 1', link: '/about/product1' },
              { label: 'Company product 2', link: '/about/product2' },
              { label: 'Company product 3', link: '/about/product3' },
            ]}
          />
          <FooterInfo
            header='Services'
            items={[
              { label: 'Company service 1', link: '/about/service1' },
              { label: 'Company service 2', link: '/about/service2' },
              { label: 'Company service 3', link: '/about/service3' },
            ]}
          />
        </div>
        <div className='flex justify-center'>
          <MuiLink href='https://github.com/Pedro-Velazquez/revit'>React + Vite + Mui</MuiLink>
        </div>
      </div>
    </Toolbar>
  );
}
