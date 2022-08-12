import { useState, useEffect } from "react";
import * as React from 'react';
import MOCK_DATA from "../MOCK_DATA.json";

export const searchBar = () => {

	return (
		<div>
			<div>
				<input placeholder="Enter Post Title" />
			</div>
			{
				MOCK_DATA.map((SNOMEDTerm) => (
					<div className="box" key={SNOMEDTerm.Reference_ID}>
						<p>{SNOMEDTerm.SNOMED_term}</p>
					</div>))
			}
		</div>
	)
}