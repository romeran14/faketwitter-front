import { extendTheme, theme} from "@chakra-ui/react";
import {mode} from '@chakra-ui/theme-tools';

export default extendTheme({
    config:{
        
      //  initialColorMode: "dark",
        useSystemColorMode: false,
    },
    colors: {
        primary: theme.colors.twitter
    },
    styles:{
        global:{
            'html, body, #root, .App' : {
               height:'100%'
            },
        },
    },
    components:{
        CircularProgress:{
        defaultProps: props => ({
            trackColor: mode('primary.100', 'whiteAlpha.300')(props),
            color: 'primary.500',
        })
    },
        Button:{
            baseStyle: {
                borderLeftRadius: 9999,
                borderRightRadius: 9999,
            },
            sizes:{
                lg:{
                    paddingY:4,
                    fontSize:'md',
                },
            },
        },
    },
    variants: {
        solid: (props) =>({
            backgroundColor: `${props.colorScheme}.500`,
            color: mode(undefined,'white')(props),
            fontWeight:'bold',
            _hover:{
                backgroundColor:`${props.colorScheme}.600`
            },
        }),
        outline: (props) =>({
            BorderColor: `${props.colorScheme}.500`,
            color:`${props.colorScheme}.500`,
            fontWeight:'bold',
            _hover:{
                color:`${props.colorScheme}.600`,
                BorderColor: `${props.colorScheme}.600`,
            }
        })
    },
     breakpoints : {
        sm: '320px',
        md: '768px',
        lg: '960px',
        xl: '1200px',
        '2xl': '1536px',
      }
});
