import React from "react";
import { Link } from "react-router-dom";
export default function NotFound(){return <section className="app-page"><div className="container empty-library"><h1>Page not found.</h1><p>The page you are looking for does not exist.</p><Link className="button button-dark" to="/">Back home</Link></div></section>}
