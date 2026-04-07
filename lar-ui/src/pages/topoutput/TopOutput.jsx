import Header from '../../components/Header'

const TopOutput = () => {
    return (
        <>
            <div>
                <Header title="TRIANGLE OF POTENTIAL - TOP" deal_name_dropdown={true} header_visibility={true} />
                <div className="container">
                    <h6 className='mt-3'>Income to Home Price</h6>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="bg-secondary text-white" scope="col">Metric</th>
                                <th className="bg-secondary text-white" scope="col">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Avg household income of submarket</td><td>$85,000</td></tr>
                            <tr><td>Avg home price affordability of households within the submarket</td><td>$395,000</td></tr>
                            <tr><td>Estimated average selling price</td><td>$385,000</td></tr>
                            <tr><td>% of households that can afford ASP</td><td>42.50%</td></tr>
                            <tr><td># of household that can afford ASP</td><td>12,500</td></tr>
                        </tbody>
                    </table>

                    <h6>Market Share Risk</h6>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="bg-secondary text-white" scope="col">Metric</th>
                                <th className="bg-secondary text-white" scope="col">Value</th>
                                <th className="bg-secondary text-white" scope="col">Risk Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Assumed annual sales as a percentage of fair share of potential buyers</td>
                                <td>3.20%</td>
                                <td style={{ backgroundColor: '#4B8A08', color: '#FFFFFF' }} className="text-center"><b>Low Risk</b></td>
                            </tr>
                            <tr><td>Homeownership rate at affordability income level</td><td>65.30%</td><td></td></tr>
                            <tr><td># of homeowner households that can afford ASP</td><td>8,163</td><td></td></tr>
                            <tr><td>Annual propensity of submarket homeowners to move</td><td>8.50%</td><td></td></tr>
                            <tr><td># Homeowners within submarket that move to a different home each year</td><td>694</td><td></td></tr>
                            <tr><td># Homeowners that move to submarket from another location each year</td><td>312</td><td></td></tr>
                            <tr><td># Total homeowners moving in the submarket each year that can afford ASP</td><td>1,006</td><td></td></tr>
                            <tr><td>Total competitors at similar or higher price in submarket</td><td>8</td><td></td></tr>
                            <tr><td>Total projects competing for buyers (including this deal)</td><td>9</td><td></td></tr>
                            <tr><td>Fair share (#&%) of potential buyers within submarket each year</td><td>112 (11.11%)</td><td></td></tr>
                            <tr><td>Average annual sales from Proforma</td><td>48</td><td></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default TopOutput
