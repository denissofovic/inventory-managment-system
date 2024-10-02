import { Box, Container } from "@mui/material";
import RoutesData from "../../../../providers/routesProvider"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import i18n from "../../../../i18n";
import { useTranslation } from "react-i18next";
import styles from "./headerStyles";



const languageOptions: { label: string; code: string }[] = [
  { label: "English", code: "en" },
  { label: "Deutsch", code: "de" },
];

const Header = () => {
  const {t} =useTranslation()
  const [activeLink, setActiveLink] = useState<string>("")
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(() => {
    return localStorage.getItem("language") || "en";
  });

  useEffect(() => {
    const currentRoute = RoutesData.find(
      (route) => route.path === location.pathname
    );
    if (currentRoute) {
      setActiveLink(currentRoute.id);
    } else { setActiveLink('')}
  }, [location]);

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage)
  };

  return (
    <Container maxWidth={false} sx={{...styles.headerContainer}}>
    <Box  
      sx={{
        display: "flex",
        height: "50px",
        background: "#f5870d",
        flexDirection: "row",
      }}
    >
      <Box
        sx={{...styles.logoWrapper}}
      >
        <div>
        <img src="/assets/dccs.png" style={{height:'40px'}} ></img>
        </div>
      </Box >
      {RoutesData.map(
        (route) =>
          route.isNavigation && (
            <Box
              key={route.id}
              sx={{...styles.navigation}}
              onClick={() => {
                navigate(route.path);
              }}
            >
              {activeLink === route.id ? (
                <Box sx={{...styles.activeLink}} />
              ) : (
                <Box sx={{ ...styles.inActiveLink }} />
              )}
              <Box
                sx={{...styles.routeNameWrapper}}
              >
                {" "}
              
                {t(route.routeName)}
              </Box>
            
            
              
            </Box>
          )
      )}


    </Box>
   <div style={{...styles.languageWrapper}}>
    {t("languages")}
    <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          style={{ marginLeft: "10px", padding: "5px" }}
        >
          {languageOptions.map((option) => (
            <option key={option.code} value={option.code}>
              {option.label}
            </option>
          ))}
        </select></div> 
    </Container>
  );
};

export default Header;
