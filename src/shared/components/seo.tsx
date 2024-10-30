import React from 'react';
import { Helmet } from 'react-helmet-async';

import PropTypes from 'prop-types';

export default function SEO({ title, description, name, type }) {
    return (
        <Helmet>
            { /* Standard metadata tags */}
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="robots" content="index,follow" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <meta name="keywords" content="rpi labconnect cs computer science research undergrad undergraduate" />
            <meta name='description' content={description} />
            { /* Facebook tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            { /* Twitter tags */}
            <meta name="twitter:creator" content={name} />
            <meta name="twitter:card" content={type} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            { /* Google+ tags */}
            <meta itemProp="name" content={title} />
            <meta itemProp="description" content={description} />

        </Helmet>
    )
}

SEO.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};