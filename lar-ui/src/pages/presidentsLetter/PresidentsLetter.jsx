import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const PresidentsLetter = () => {
    const navigate = useNavigate();
    const [showGapsModal, setShowGapsModal] = useState(false);

    const handleGenerateOrEdit = () => {
        navigate('/letter-editor');
    };

    return (
        <div style={{ marginTop: '56px' }}>
            <Header title="PRESIDENT'S LETTER DASHBOARD" header_visibility={true} deal_name_dropdown={false} />

            <div className="container-fluid p-4" style={{ backgroundColor: "#f7f9f9", minHeight: "calc(100vh - 120px)" }}>
                <div className="mb-4">
                    <p className="text-muted">Generate and manage Land Acquisition Report letters for your communities</p>
                </div>

                {/* Available Letters Section */}
                <div className="mb-5">
                    <h5 className="d-flex align-items-center mb-3" style={{ color: '#002532', fontWeight: 600 }}>
                        <AddCircleOutlineOutlinedIcon className="me-2" />
                        Available Letters to Generate
                        <span className="badge bg-dark ms-2 rounded-pill">3</span>
                    </h5>

                    <div className="table-responsive bg-white rounded border shadow-sm">
                        <table className="table table-striped table-hover mb-0">
                            <thead className="table-dark" style={{ backgroundColor: '#002532' }}>
                                <tr>
                                    <th scope="col" className="py-3">Community</th>
                                    <th scope="col" className="py-3">Location</th>
                                    <th scope="col" className="py-3">Lots</th>
                                    <th scope="col" className="py-3">Acres</th>
                                    <th scope="col" className="py-3">Data Status</th>
                                    <th scope="col" className="py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="align-middle">
                                    <td className="fw-bold">Sunset Ridge</td>
                                    <td>Phoenix, AZ</td>
                                    <td>142</td>
                                    <td>48.5</td>
                                    <td>
                                        <span className="badge rounded-pill bg-success px-3 py-2">Data Ready (12/12)</span>
                                    </td>
                                    <td>
                                        <button className="btn btn-success btn-sm px-3" onClick={handleGenerateOrEdit}>Generate Letter</button>
                                    </td>
                                </tr>
                                <tr className="align-middle">
                                    <td className="fw-bold">Eagle Creek</td>
                                    <td>Dallas, TX</td>
                                    <td>89</td>
                                    <td>32.1</td>
                                    <td>
                                        <span className="badge rounded-pill bg-success px-3 py-2">Data Ready (12/12)</span>
                                    </td>
                                    <td>
                                        <button className="btn btn-success btn-sm px-3" onClick={handleGenerateOrEdit}>Generate Letter</button>
                                    </td>
                                </tr>
                                <tr className="align-middle">
                                    <td className="fw-bold">The Meadows at Riverside</td>
                                    <td>Orlando, FL</td>
                                    <td>204</td>
                                    <td>67.3</td>
                                    <td>
                                        <span className="badge rounded-pill bg-warning text-dark px-3 py-2">Partial Data (9/12)</span>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-secondary btn-sm px-3" onClick={() => setShowGapsModal(true)}>View Data Gaps</button>
                                    </td>
                                </tr>
                                <tr className="align-middle">
                                    <td className="fw-bold">Willow Park Estates</td>
                                    <td>Charlotte, NC</td>
                                    <td>118</td>
                                    <td>41.0</td>
                                    <td>
                                        <span className="badge rounded-pill bg-success px-3 py-2">Data Ready (12/12)</span>
                                    </td>
                                    <td>
                                        <button className="btn btn-success btn-sm px-3" onClick={handleGenerateOrEdit}>Generate Letter</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Previously Generated Letters Section */}
                <div>
                    <h5 className="d-flex align-items-center mb-3" style={{ color: '#002532', fontWeight: 600 }}>
                        <DescriptionOutlinedIcon className="me-2" />
                        Previously Generated Letters
                        <span className="badge bg-dark ms-2 rounded-pill">4</span>
                    </h5>

                    <div className="table-responsive bg-white rounded border shadow-sm">
                        <table className="table table-striped table-hover mb-0">
                            <thead className="table-dark" style={{ backgroundColor: '#002532' }}>
                                <tr>
                                    <th scope="col" className="py-3">Letter Title</th>
                                    <th scope="col" className="py-3">Community</th>
                                    <th scope="col" className="py-3">Status</th>
                                    <th scope="col" className="py-3">Created</th>
                                    <th scope="col" className="py-3">Modified</th>
                                    <th scope="col" className="py-3">Author</th>
                                    <th scope="col" className="py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="align-middle">
                                    <td className="fw-bold">President's Letter — Sunset Ridge</td>
                                    <td>Sunset Ridge</td>
                                    <td><span className="badge rounded-pill bg-success px-3 py-2">Approved</span></td>
                                    <td>Feb 28, 2026</td>
                                    <td>Mar 4, 2026</td>
                                    <td>John Doe</td>
                                    <td>
                                        <button className="btn btn-outline-info btn-sm px-3" onClick={handleGenerateOrEdit}>Edit</button>
                                    </td>
                                </tr>
                                <tr className="align-middle">
                                    <td className="fw-bold">President's Letter — Eagle Creek</td>
                                    <td>Eagle Creek</td>
                                    <td><span className="badge rounded-pill bg-warning text-dark px-3 py-2">In Review</span></td>
                                    <td>Mar 2, 2026</td>
                                    <td>Mar 5, 2026</td>
                                    <td>John Doe</td>
                                    <td>
                                        <button className="btn btn-outline-info btn-sm px-3" onClick={handleGenerateOrEdit}>Edit</button>
                                    </td>
                                </tr>
                                <tr className="align-middle">
                                    <td className="fw-bold">President's Letter — Twin Oaks</td>
                                    <td>Twin Oaks</td>
                                    <td><span className="badge rounded-pill bg-secondary px-3 py-2">Draft</span></td>
                                    <td>Mar 5, 2026</td>
                                    <td>Mar 5, 2026</td>
                                    <td>Jane Smith</td>
                                    <td>
                                        <button className="btn btn-outline-info btn-sm px-3" onClick={handleGenerateOrEdit}>Edit</button>
                                    </td>
                                </tr>
                                <tr className="align-middle">
                                    <td className="fw-bold">President's Letter — Harvest Glen</td>
                                    <td>Harvest Glen</td>
                                    <td><span className="badge rounded-pill bg-success px-3 py-2">Approved</span></td>
                                    <td>Feb 15, 2026</td>
                                    <td>Feb 22, 2026</td>
                                    <td>John Doe</td>
                                    <td>
                                        <button className="btn btn-outline-info btn-sm px-3" onClick={handleGenerateOrEdit}>Edit</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* Data Gaps Modal */}
            {showGapsModal && (
                <>
                    <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
                    <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 1050 }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header" style={{ borderBottomColor: '#f1f3f5' }}>
                                    <h5 className="modal-title" style={{ color: '#002532', fontWeight: 600 }}>Data Gaps Identified</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowGapsModal(false)} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <p>The following required data points are missing for <strong>The Meadows at Riverside</strong>:</p>
                                    <div className="p-3 bg-light rounded border border-danger">
                                        <ul className="text-danger fw-bold mb-0">
                                            <li className="mb-2">Phase 1 Environmental Site Assessment</li>
                                            <li className="mb-2">Approved Soil/Geotech Report</li>
                                            <li>Final Utility Will-Serve Letters</li>
                                        </ul>
                                    </div>
                                    <p className="text-muted small mt-3 mb-0">Please provide these details in the Input tab before generating the letter.</p>
                                </div>
                                <div className="modal-footer" style={{ borderTopColor: '#f1f3f5' }}>
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowGapsModal(false)}>Close</button>
                                    <button type="button" className="btn btn-success" onClick={() => { setShowGapsModal(false); navigate('/topinputform'); }}>Go to Input Tab</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}

export default PresidentsLetter
