import { AppDispatch, RootState } from "@/store";
import { fetchMovies } from "@/store/actions/movieAction";
import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  FormControl,
  Input,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const Searchbar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      dispatch(fetchMovies(values.search));
    },
    validationSchema: yup.object({
      search: yup.string().trim().required("Search is required!"),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl id="search" isInvalid={!!formik.errors.search}>
        <InputGroup size="lg">
          <Input
            type="text"
            w={{ base: "100%", md: "500px" }}
            maxW="100%"
            variant="outline"
            placeholder="Search movie by title"
            {...formik.getFieldProps("search")}
          />
          <InputLeftElement>
            <SearchIcon color="gray.300" />
          </InputLeftElement>
        </InputGroup>
        {formik.errors.search && (
          <FormErrorMessage>{formik.errors.search}</FormErrorMessage>
        )}
      </FormControl>
    </form>
  );
};

export default Searchbar;
