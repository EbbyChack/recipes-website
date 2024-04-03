import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes } from "../redux/actions/recipes";
import { Link } from "react-router-dom";
import { Button } from "bootstrap";
import CreateRecipeForm from "./CreateRecipeForm";
import { setUserFavs } from "../redux/reducers/recipeReducer";

function AllRecipes() {
  const recipes = useSelector((state) => state.recipes) || { recipes: [] };

  const dispatch = useDispatch();

  useEffect(() => {dispatch(fetchAllRecipes())}, []);


   useEffect(() => {dispatch(setUserFavs())}, []);

  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <div className="container my-5">
        <CreateRecipeForm show={modalShow} onHide={() => setModalShow(false)} />
        <div className="d-flex justify-content-between align-items-center">
          <h1>All recipes</h1>
          <button className="btn btn-dark" onClick={() => setModalShow(true)}>
            Add recipe
          </button>
        </div>

        <div className="row">
          {recipes.recipes &&
            recipes.recipes.map((recipe) => {
              return (
                <div className="col-3" key={recipe.idRecipe}>
                  <div className="card">
                    <img
                      src={recipe.mainImg}
                      className="card-img-top"
                      alt={"img" + recipe.idRecipe}
                      style={{ width: "100%", height: "40vh", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{recipe.nameRecipe}</h5>
                      <p className="card-text">{recipe.description}</p>
                      <Link to={`/recipe/${recipe.idRecipe}`} className="btn btn-dark">
                        View recipe
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default AllRecipes;
