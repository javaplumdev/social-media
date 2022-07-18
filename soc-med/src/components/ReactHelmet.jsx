import React, { useContext } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ContextVariable } from '../context/context-config';

const ReactHelmet = () => {
	const { tabName } = useContext(ContextVariable);

	return (
		<HelmetProvider>
			<Helmet>
				<title>Sillyfrog </title>
				<link rel="canonical" href="https://#/" />
				<link rel="icon" type="image/png" href="favicon.ico" sizes="16x16" />
			</Helmet>
		</HelmetProvider>
	);
};

export default ReactHelmet;
