import React, { useState, useEffect } from "react";
import FolderDataService from "../../services/FolderService";
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const Folder = (props) => {
  const initialFolderState = {
    id: null,
    folderName: "",
    description:"",
    requete: "",
    userid: "",
  };

  const [currentFolder, setCurrentFolder] = useState(initialFolderState);
  const [message, setMessage] = useState("");

  const getFolder = (id) => {
    FolderDataService.get(id)
      .then((response) => {
        setCurrentFolder(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFolder(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentFolder({ ...currentFolder, [name]: value });
  };

  const updatePublished = (status) => {
    var data = {
      id: currentFolder.id,
      folderName: currentFolder.folderName,
      description: currentFolder.description,
      published: status,
    };

    FolderDataService.update(currentFolder.id, data)
      .then((response) => {
        setCurrentFolder({ ...currentFolder, published: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateFolder = () => {
    FolderDataService.update(currentFolder.id, currentFolder)
      .then((response) => {
        console.log(response.data);
        setMessage("The Folder was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteFolder = () => {
    FolderDataService.remove(currentFolder.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/Folders");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="6">



          </Col>
          <Col md="6">
            {currentFolder ? (
              <div className="edit-form">
                <h4>Folder</h4>
                <form>
                  <div className="form-group">
                    <label htmlFor="folderName">folderName</label>
                    <input
                      type="text"
                      className="form-control"
                      id="folderName"
                      name="folderName"
                      value={currentFolder.folderName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      value={currentFolder.description}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <strong>Status:</strong>
                    </label>
                    {currentFolder.published ? "Published" : "Pending"}
                  </div>
                </form>

                {currentFolder.published ? (
                  <button
                    className="badge badge-primary mr-2"
                    onClick={() => updatePublished(false)}
                  >
                    UnPublish
                  </button>
                ) : (
                  <button
                    className="badge badge-primary mr-2"
                    onClick={() => updatePublished(true)}
                  >
                    Publish
                  </button>
                )}

                <button
                  className="badge badge-danger mr-2"
                  onClick={deleteFolder}
                >
                  Delete
                </button>

                <button
                  type="submit"
                  className="badge badge-success"
                  onClick={updateFolder}
                >
                  Update
                </button>
                <p>{message}</p>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Folder...</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Folder;
