/* ============================================================
   Saving Health Ministries — site script
   - Mobile nav toggle
   - Give amount selector
   - Video grids: shows David's videos (hardcoded list below),
     with titles + thumbnails pulled live from YouTube.
   - Optional: full auto-publish from the channel via API key.
   ============================================================ */

/* -----------------------------------------------------------
   DAVID'S VIDEOS (showing now — no API key needed)
   Paste a YouTube video ID for each one you want featured.
   The ID is the part after "youtu.be/" or "watch?v=".
   Titles and thumbnails load automatically from YouTube.
   Add or remove lines anytime.
   ----------------------------------------------------------- */
const VIDEOS = [
  { id: "lwUHusVlouM" },
  { id: "WToxnbTbuEI" },
  { id: "5xbElr2kI4I" }
];

/* -----------------------------------------------------------
   MAIN FEATURED PLAYER (the big one on Home / Watch).
   Set ONE of these:
     playlist : a YouTube playlist ID (plays through the whole list)
     video    : a single video ID
   If both are blank, it falls back to the first video above.
   ----------------------------------------------------------- */
const FEATURED = {
  playlist: "PLlo6nE3v7Hm2axuyJPZoNv-0Uc1xh_-4T",
  video:    ""
};

/* Thumbnail shown on the big featured player (the playlist cover). */
const FEATURED_THUMB = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBAUEBAYFBQUGBgYHCQ4JCQgICRINDQoOFRIWFhUSFBQXGiEcFxgfGRQUHScdHyIjJSUlFhwpLCgkKyEkJST/2wBDAQYGBgkICREJCREkGBQYJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCT/wAARCAC8AVADASIAAhEBAxEB/8QAHQAAAQQDAQEAAAAAAAAAAAAABQMEBgcBAggACf/EAFUQAAIBAgUBBQQGBgcGAgQPAAECAwQRAAUGEiExBxMiQVEUMmFxCBVCgZGhFiNSYrHwJDNWlMHR0hclU3Lh8TSCY3SitBgmNTY3OENVZHOSk6Oywv/EABoBAAMBAQEBAAAAAAAAAAAAAAECAwAEBQb/xAAxEQABBAEDAgMGBgMBAAAAAAABAAIDESEEEjEFQRMUoQYiUWGBkRUyQnHB4VKx8fD/2gAMAwEAAhEDEQA/AOXFRnbc3iY+vnhxHCv2v4Ywi4cJHirQpuclYYadPf3fd0waocyji2LtZkFr82t8cDKeikl9yNn6e7ziZadyClel211OqSknxbubYuwKLihT6jaK6wxo6/tXvjdM8jnurQ7WPnfj7sSV9K5TFGZG27TcgKeRgZUZfkcUhWKGdXP2lNlB9LHFtpU7SFDTe1N4qdmU+aDrix9E0S09RErxq6EjhhziI5TQbGRoWdV689MW1ogzJURRzRxSqCOWXnFAAAp3ZpXFkdNl+U5OcyqGip6eGMyO8jbVQAXLE+gGOaO0z6XGeZjXS0OhNmV5ehKiumiV557faCsCqKfQgtbnwnjFlfSk1DJkfZDHl9JJ3X1nUxUkmw2OwXcrceuwA+ouPPHFhx5r3ZXe0YVvaL+kzr7IdTUVdneeVWb5Wsn9Ko3SO8sZ4O07RZh1FiOQAeLjHU+h+3PQvahmEmU5PVVArVj7wQ1UPdFx57eebeY+/pzj59YNaM1BUaU1VlOdU0jI9FVJKSvVlvZl+9bg/PC3lNS7V7RsgbbJtj+JIGOctW5f7LNJtjbqebY691jX0dPlZqKhdy7eluTjmXXepsrnmdafL28xe2PQidbcrilFFU1WKyMfD4b4aYLZpP7RJ4Y9i3wOKYi4ZTtSDYRcYcuuG7jE6VAm7jCD4cSLhF8SKsFhF3MFHvEgD54NR6SzCW7K0SpYEMSRe97eXwwyyMUrZvRe21S0dN3ymScxmQRqDcnaOvTp546dzXsKqqDJ1khp6xJ44itxLHOLJzeQC1r2PKe7fpJ1EnGlRgB5XKrqUYqfeBsR8cYGN5irSuy9CSR8saLhwkSgX+GNiPDjAHTCjL4R+GHASkpALjJO3ChGxR8ca9zuwS1YFInCkJVZBu93zxsYf2fF8sZ9nb9lsLtpG1KcpzejymESNJ7ymwQbirep+A8/PGKfNvaJBu8bNzuPriM9z9r188FcjpWaba3wOKtceFzPjaBdqyNP0clVGZE8rYt/SUdPp7L3zLM6pKOnVCTJK21R5dfjxiH9n+UrFRur7WupNyOben8cKdrFctVomt29wvspQRl3C7ju5A9Wtfgc4nIbO1Qjbm1Xev8APsnqtWSSZJu9lVVEkhPhlk+0y3vYf44kGhquasqo1RWWxB49MVLSyNLJ4veuLYsJs5jyHTccdLmUVLmkyh+723aSMvtIHB54PXyBwxGKVHA3hXw+ZR5THBHKyvLOeB02j1+WF8/yyOqoyqruYi6m38MVBozUNdmVdTtVyPVWstn5t15GL4oVWqy+NvE/Vefs445G7Da6oX78KnMwyjxHcu3r1GAFZlf2UVfQnFxZrkccu9VVdwuenTFeV9L3TOreV8O11oltKBV+ULFfdiKZpRrztXFg5pEzXxFMwpWa+HAWtRiOHDiODC8dPh5FTY6QFEpKkeopW3QyNEx62PB+eDMWdyPTinqIVdgCBIhsb/LDWKlw5WkxRuEhWUnkddvfNt/ZPH34kWlnp6XMI5qqNHgHvXG4k+mAC0uHdJ30DeBvuIuD88UDkpCteGgp80tJEqoq83QBbDEwyCGlomTfGq7fjc4p+kz2ZFHvRNa3gcgH54MU2smVfFIyr5sTy2M92FmDNqwO3bIG112Z1NPl697W0LJVwRg3LFb7lHncqWt6kDHFmOpqbtFWL3pGZfn0PwxBNYaL03quslzCim+q6yQ73MShonN+WK8cn1B5vjhcMrraqUviWdl2k6jWWtctoUhLU8cqz1bkXVYVILX+fuj4nBil7J4e8/pOoIu6HiIjgO5h954xZGnM0yHs+y16PJ4/HIN0szcyykDqT+PHTnjAARJVs9puo4afK5IVZX2qRYNbyxyxqXV1L7VIqbna5BCEED78Ee0ftCzDN4Ujhk2obh2HX4f98Vgxa/i5vycXMpaNoUvDBNlFnzzvW8ULW+DXw4jkjnjEidD69cR+2HmXVHdSMvkw/PExIbymLB2T+XDWRsbTT4aPJglywavOcIscbFsaNiZKcBbxP3UiSbd20hrHi+O9dW6gpVyPONL0rKuaLk80qwmS80aKjIJNtuQHVeSQL8eWODaQb6qJdoa7qLEXB56YuyDMKyoqKvODUTrmNUkkU+Ye67J3KCVFt1VhvAAsB1tfnEpKxaoxpdwqMONlGNTjKnFAkSy4XJ3w/fhqGwqj+E/EWxRppI4JfYr7f2VQD78asPsr59cYST/zfDCkTru8WHBSG14RLEo3LuY9PT78a7/Ft2puAPQYzPLv91vv9MJ7tq+Jfjb1+JxiQtyLKMQ08LRp3rKq8cH7RwQy9svoGRqqRmYcbVF2bngYiz1M0vvSNt3bvvxhZ23bnZuh64G5IYiRkq3cr1bNW1VHT0++KlXhgQLk+h+A8vmcM+07V1DmmWx5Wsbd7TVDOsgYFWAG0m3lc9PhfFb0+c11KrrTzNEHBU24IH+HzwhVVlRWSCSomaVlAUM3Uj/HCki7WZDtS0NTtmRtu5VINh6fHBCSumzKqSaZtzKAijptW9wB95wGTBLLSqzBnXcthx64wNlO5oAtXD2bpuaJYo90pIW/Xj1xe0dXS5JT0+XyzKs7qrMb8qD0LfPFJdmlTDRbKqHaz7wqK4tb4n7sFdR6jmbPp6rc7vPtRSD4dwUX+4dMSkbuKjHJsFq30ijqrsjK6kG9uf588QDVGTLFVSbPOzC+JpoKnkbL45pmbdKDw3P34R1Tlyy+8u1wSCPK3riDcOpde7c0FU/XZa3PhxH63Km58OLOq8o6+HAaryf91cXtKqjhpP3cPIaJv2cEoKLD+Gg/d/LHWFEobFQ/u4dR0H7uDEOX/u4eQ5d/NsOEpUfGX4SMSq233Wtex629R64YdoGsmyGb6pyxl9ssGnnsD3QPRV/eIsSfIW8+lXvVTSzd880rSnkyFiWJ+eJOlAwFRsd5Ktqdu6+18P8Avgl2fZZluq9UVFDnElelBT5ZVV7mhZFmvEFNl3gr0JHPw5GKt05qGSjrBHVzM9O/VnNyh9QfT4YsXsLzqhqtXV/t2ZUeW+0ZNmFMJa6URQo0gUIN3p+fXCOksYTNjpTjJdEdmeoMtznOkqte0VHkuVLmc9LVGkEtRDIpeN4mS46Rt4Wtyw6Yc/oZ2ZLo7JtVQydocsecZr9T09D3tItSlSWkUK6sAq8xkctxcX87aZdp6On0RqjJX7QOz+DNMyynLsophFm+6Lu4GPePIxQEFkLAAKecPX01kNVkMeR13aFofNKUa4XUUnfZiirNRFCJIygG0OSW8I8J3HkYlZVaQyryXsioNN6fzyfNtcS0Wf01fVUzK1MhjFKCXjcFQN5PgW1wW8wDfEX13pHIcm7UtLaPy6TO0hzM0BzFK+WNqmmeolAMfgTarKhBJBYXYenMozzReWag0RobIq/tI0VJWaco8zilm+two7yQA0ndsFuVRkjDXAIA4BwF7Rpsr/25aL1MmdZJWe1y5ZPmtRl9UssENTFKizEsLEJtCsC1iRf0xsrIlTdlPZPqXXCaNiqNeUVf9Y1NEtTVNTPT1ElMA8yKVuwJjIIYqALji/GGuX9m/YjmOX6lzCFNf+z6cmhiqmaSmvIrzNF3sfHMalWLE2sBfyIEsyXLcpyvtZGrKrtC0KmV0+a5rmlOq5qGnkNVAsaoylQqhdgYkE+fzw20TkuU5Dl+fZfmvaVoXMVzjTr5a4XMo1ENT3krKOFG6MCW+8+K9xa1jjLKs+2LQHZ/pXR2T5xpSTPmqMzzCpgi+sZomWSCnZo3kUIo4Z9m0k8i/HOKeQ7GDYtTt8rKNajRmR5fnWW5tS5Rpympnky6cSwCoDyCQqw9dqnnm1sV/keTLm7SK1UsPdlSV23Zl5uR8rDrxzgLJgWwf05oqs1Ll9bXRVEVPFTSRQr3iOe+ke9lG0G1rXJ8gQTxzgvQaNydmRZZK+V3IIVQm1k/aDe6fM8G4tYi5xIgMj05SvS0MjbZrOyyNu2MVKkgrbY1iRuU2INjcC2Fc+gqNZZVXSZRXRVElO9NKksZKuri20jqOcPIdLZjUe6qK1r2YkE/li5odPU+t8nOdZVIiTxP3VVTqVJkYLe9uRuIsLG1/XpeIvqLLaKR6dKevleA91IHQqY2HBGzxWI6c83GEEu7hOYgOSoZSacrIqqOQ1FGjo6sFaTk8+mDy5ZqaLYqV1Y1P0WETSBNn7O3p0+FsE0zeaoo5Kqlo6+CngPjliS2254Pug3PXi9vP1wxfU2WuHqJY62cEgs7lmCr6+6Ph8OcYlyIaz4qN1ekswp2a7UnX3ROtx8ObYanT2abdyUcsq3teIbjf5DnEy/TXLdvgV+6W52lSpI9P6wH+RjNNrKGotDTtUI8sgtHCZNzt5AAN1vwB1OMHP7hDZH2KidDpDUWYzGGlyPMpXA3ECncWFjySRYdD/hgfNBJRzPDURvDNGxV45F2spHkQeQcXrH7Po2jeoz2Soop5xHM6SMZZUIDhFuCfEe8chRcC5YjAWozjLdUZo9U7Zczux3JU3u37vjQfZ4+1c8/DGbNeaWMPzVQFsZR9uLbrtPZPPGG+oQi87jEqBenkyqT5Xv5HFe6sp8vosySny+lWDZGvfATGQFzzxcDi1vLFWvtReykGZuvyOOm6nsG7NaLV2T6Tmy3tBnr80gWaGpgqaP2dkspke7WYKm7kbb8cBuMcy7em7HV/Zlnunaen7OtT5lrTT1OmR5NWQVtNU149r3yE2tHyTYDpe/SwOGKUIHknYt2V6hrs3hpaHX6UeUCrL15lpmhqTTtteMEAlHJO5VcLuUX4wzouzHsVr8jzjOkj16tPlGW0uZzK89LveKcEoFAuNwtyCR8L4l2XVem8o1ZnGqMw13o+lyrPYKyjM2W1W6SuM8g7hpqZECo0SswaS5JNyxHiOBmUaeyvLtHapyPMNfaFir84ySiy2i7vNw8bLBuXvZGKjbu3CwAa3PJwqKH1HZB2LRaRzXVUM2tq2gy2qgpNtLNTvJUvMkLIYhtG4ETp1INwePVDNuyvsTyal0XVVEmuGi1gA1Ey1FNaAfq+Zrgbbd6t9u7ofvNUmm8hybTMmncn7StF0dOdZx53HJ9Zo5ioEVdqbSCDIrItlPhO0XOGmZaQyfNuz3S+mavtG0PJWZJQ5nSmc5qNpeaWN6cr4b2VY7N0t5XwVkxyHsp7GNQZLp/OKRderBn+a/VFMsk1MHSXnxPYEBODyCT8MU9mmXw5HrDNcjhZ/ZaLMaikSSUi/dpIygseBey8nHSOXUWmaCj07Sxa+0UseU6tnztlXNFt7KzSbUXj37MvHA6845r1nXw1WuNSVFLIk8E+a1UkcsZ3K6mZyGB8wRYg4LeUjxhSjLtSQ5Nlc7Uu123BADwbX8vPpfBXSOaVWfZpE0rJ3UXAi6WHFyfXyv6Yr1ahp5E8O1doHHr64mmkcsm7zvomZFYFAw4Ivxb78VrC43gBdHaBhkzHMJG8S063sCeNo8hg5nVJ/SH8Kt5A+dh5Y27Nsnan07Jub9awW48/Pj+fhgpPl+5vEu3n0xxj8xXXHewKFVGW7r+HAeryv8A9Hiwpcr3/Z/LA6qyjw/9MG0wC54gpl/ZwSp6Vf2cMYp1w8jqVx3blPaiMMEa4eRIvHu/LywMirVwsK9f58vjjblg1Ul2nZJNk2rKqSRi8VaTVQvtsCGJuvzU8fgfPEPxY2rteZTrJmyupp2pqWCRnpswF2YEAjxJa+1uOByOD5WxXRxzu5VQiumMvizbUFDQzqzRTShWCmxIwd0ZRxxZ3mOUzqrSqGUP6lGsQPn1+7ArRVdR5XqKkrq6o7iCn3SE7SxY7SAAAD5nz4wR0pO2c6+SuVVgVpJahlU9BY8D16/xwByijWfZStLTySJGu8Asp4P8+XT1wBo8zy2VY1lZImt4iw4+WHfaRmkkuaR0asViiXdtUWBv5/H+GIVfDF2UKVl0WUUtfCk1K0UqX95BuF/TDk6d8O1l+63HyxFezrM2o9Qx0ryKtPVXSQHoSFJU/O/H34tl0jX9n/DDNNrFQDNMso8opTUVWxF6KB1c+g9cQfMK5ayTwwrEo6eZwb7QswWt1FLHGbxUoEQ54LdWNvmbfcMRfCOKwCyTh3llfJllZHVR+JkN9p6HDPGb4VFH6vUG+STq+7xMsY7tSetzfkkYZy51JKx2U9Ol78ldx/Pj8sDL48MakbKkul9d51pLNhXUMysrWWamdR3UyfssvT5HqDY4nGb5jontImGbJ7Vk2cwKJaiKVu8WoRAC1rnxkKpA90m3NhyKodfDhSgZlrafbMsDb1tIxsF56n4YR0bSd3dEPIFK5s1p5osl7uWhqny2VDcRRxPLtVQwLjggdSS1iSLcG4DCmyuo1RS1+VzZLFRVgiTupFjuHP7W8+8Au9rr1t5m2FjnmcZjQ02SpWZdmTSK8DRySCIObGwFiN4sXBuOCliTxi0dH5Q1PQ0TVypK5jRUMniZWPLKCeikhQB0vwLY5dRMYhfddMLA5VLmfYNHkLR/WuqaeJSqyEJT28HN2LFrKAFPiPF7DzwnS6p0H2byd5p/Lzn+cpcLW1RvHCf2lPS48tq/+bBX6Q9S0sdEySbomnZLeXhXgf8AtHFJXbBhDpmBzzj4cJJCI3U0IxqTVWbaqzI5hmdQZJbkqq8LHf8AZHl8+uB6zzf8RufxwnFHvw7ipGbw+43UE9CMdgAAocLnLjdlaw1ckUgZVTeDuD2sQfW48/jhSd5sym9olkd3IC7pHLH8TycKy0MlOwZ42VfXqLeuCFFTRxTIsq/qjxuHJHxPwwaQ3ptBlM08JZI23KNx45t1P5c4YLSqzFSvQ88fwxZuR5R7PWIrNtWwLHgiQdQR6EHz9fvw31rpCOlkGZZeq+zzjcyqOIzfkfK9+OowzCOFJziOFXUdJ3rG6jzvjdKNWV22rtvYcYIx0+xire9fn1GFUiXu/d6lW+6+LbQpGQoI9N4ioXpx0xg06/s/lggib5ju8ycaGLq3rY2wNoTiRMfZ1/Zw6p4enwxvs8Rw4g8sLtRLk/o6RuPuxZGk5u9p0o1j/WhwwYHr6DEBoa2PcFf3RiXaez+nyiYVCrvYEMo8r/HBPC53i11lobNI6XT9PDL/AF9huBPJJ/m/34kL1EfO5VxR2jtVQy08maV0m2xUqGPF+gxNodVRyxo3ebdwBtjhLfeXcw20KYyyx87cDqqVdvu4j76jVvtLhrLnqv8AawRXdMubjm1P/wAvyOMfWsP/ABPzxCWzRf3sJPm37LY6LS0p39dR/wDE/PAXUetmyuFY6La9U/N25EY9beZP+eIwc5/ebAOsqGqqqSZmvc8fLyxrWpJyyNPM8j23OxY2Fhc/DCePY9hUV7BvSDSRagpJI77VJLkdNtub4CYNZfVx0sI7tfEbFmHU/PGWT7WlLH7UlZEyskpKm7cg9bW9OvIxF8FqnMe/qB33iTYVsOTc+f8ADA6Xu+8PdX234v1tjFZEdOU80uawSQ7dsTB2ZgCoHob+vTFhZvqylyal8bbp2B2RLySfU88C/wD0xWdDmE1AztA23cOQeh9DhKaWSdnmlkLux5J6nBtZaSyNLI0jsWdiWZj1JPnhPHsewFl7Hsex7GWXsex7HsZZOrbqcfAYQJx7c23b9nGpxlk/yWr9iziiqtzjupkY7OWI3C4Hrx5Y6Up9QVG14/bN22zFnPeBxcX9LqbA368DzxzFSyLFURM67lV1JB6EX6HFs5NnC7o/a23bLxkX4ZRwDx+H3Xxyapm4Bw7K8Lqwtu2XMYcx0/SMm1ZYa0owXgX2Ncj5kX/m+KfGLI13C2bUaeyK0rLMrCNeSQQR09f8OcVzIjRSPG6lWUlSD1BGKaYVGAlmNutOaZ1Rhub/ACwWURvD3iSKret+L+h/zxHw2F4aqSJgys3Hlfgj0x0KJCkVDmKwVgZ41eBrB4geLWtx/Pww5zKmjol9ootrUs1wV6GM+Q+Hw/DEeNXG/iXwcdB64VXNpF8Kszpbbbzt6c4yTaphkupqeWnSnqm2upsu7gj4qfW3UYkmV5/Sy08lO9RFUIbgDcCSPiPwxVBqIZfEvht+OFqbM2pW3I3UWJHl/POAR3RDSpZnGXU8Uxkh3dSwC8g/D5/Dz8vTAM7dvgZWU36HphL6/Zl2szff5YZ1FTHKxZW2S9TbgN8Thw8pXRBLk7JMY/6YaLWeHa67vj6Y0eo/Z93B3oeGnnhxuu3A41WMiqxty21Ell24cwVrRMNreY69MBDVYz7XjbltisL9L6j6tgpUk2L1cDoxv0+WJVQdov8AQ6dWk8W0KRfkW45xSy1/72FY8yZPdZsIQCmaCFftLrVZfD3ni+eFv0r/APSfnikaHPmi8XeNuwRTUrf8RsTLFUFQX2jEp7NdBZp2n6sptPZZIkLyBpZ6mQErTwr7zkDr1AA8yQLi98Q/F9/Q6Bl7Rc3pQg/X5NMO984/1kY4/EYdYc5Rr/Yj2Lo3sL651E9ULj2xIl9lve1790Rtv57rfHD+p+itonS2S01VqzWOZLLPM8aTUMSmKUXYoQu1iCYwCRci97Ei2HZyuPSUx03rfKauKjM6z+00bASWVGj3xmxDxkMSVFmBsbX4xYHbetPFonTa0Une0q1CiJ733J3DbT+GPLbrJfDe9wFjsvrJeh6UamCGMuLXnnBBFcggehVa0n0beyqszalymDWWoXrapUeKPukG4NGJF57uw8JBw4k+i/2YxakGm31jn65q1rQFY+fAXtfu7X2gnrg3pf8A+lLTX/qlH/7kuMdp9ZJlvavU5hDffStSzgjqNqJx8j0PzwXa1wYXkcOr6IR+z8Uk7YGuPvR7vrdD6INkH0W+zPU9PV1GVau1DPFSNsmYoi7Ta/nGL8emASdh/Y5UKPZ+0HOot4uHmpxtA9T+rFhi3Own/wCQNUsF27pg1j/+Vircpij/AECkqO7XvVrqRFe3IBgluL+hsMB+tkDGuFZv0VdP7PaZ880T3H3Sxo4/Vzf7FN8o+irl+V1GfVGsdQ1S5LRQ01RQ5plqrsqo5DIGupDWYFU4BPvg3N8FdOfRl7LtV1E1Pk+sc/qJYIxI692ikKTa/MYvziwdUVncfR4yGH3mqabL4x8l2SfwjwJ7Jo2yLtLp6V9yisyroTwWeOKa/wCCsPvxR+rcJWsAwa9VxxdFido5pnOO9pdXwIbV/wC1CYfo+9kVRltVmCa4z/2ejeOOcmJQys5IUbTHfkqfwOIX22dkOjuzrSuRZxp/PM0zCfOZS0CVexVNOEJZ9oUNe7R/CxPwxZur8iqqLXWc6VplZEzavp5ISpsbMXKkfIzSD/y4rX6V+fx1/aRFkNI22i0/Qw0SRLfYrkb2IHrZkXj9gYppp3yOcHDj/f8Axc/VunQaSON8TiS/I/ah/JP2US0J2H677RaH6wyLJS1BcqtXUyLDG5BsQhblrG4uAQCCOuA+t+zvVHZzmMdBqbK5aF5QzQyXDRzgGxKOCQfK46i4uBfHV3aMzZNNpPL/AOm0umYsvjCUlJOadyQtjdRaxH6vr+8BzfDnKuzebtg7IqLKNQ5hLEsWZ9/TVfEs0cKcMoJPBP6xQTewIJBtbDN1IdKYq4UJukuj0TNaXCndvv64yqK7Gux3Suu9G5zqTU2dZllkGXVaU96QKVIZV5IKk3uwHGJfS9gvY9WVUNLT631C0s8ixIvs4G5mIAH9V64ZfRP1hSy11R2c1+RU+Y0ucSvWSTTyBkQRxghTEVIa5UckjE/7M6XL/wBJNSVVXltLWrlNPNV00UqAiN45SV23B2kbQAR0wJ5ZGSNa2qKp0/R6abTTTTbrYAcEdzSAVv0YuzDL9RQ6eqdYahTMptu2Hu0O7cCR4hHbyOPaZ+jD2YawapXJNYZ/VGmVHlGxF2h923rGL32t09MSbtKrpsr7YY66lpfaqinjp5EgF7yHa/h4BPn6YJ/RxXZWakX0hogPxqMQbrHGfwvmfQLvn6FFH07zoJva09uS6j9OKVZ0vYL2O1lZBRwa31E088qwovs4F3ZgoF+69TiqNedmTZH2uVPZ/p1qivf2mCmpWntvdpI0bxEAAAFzzbgC5xfXZbPTxaoVanTa51vqIUikMQb2Bu8P673TbyN+OnXACndar6bp3KOKpxwbi60BH+GL6Od0zC5y4Ot9Pi0UwjiuquyQb+3H1TY/R+7MNMKuW6u1rnM+dKAKgZVCO4hci+03jc8fEgnrYdMH6T6OOQxZbXZ1mGtqibTcEUdRR5hQpGZGXxB1kXa3K2WxXrc3AI52T6v/AEi1z9ZzPBDNJXQiaOm79onauADBbi/p1GJzl0dFT9gudx5fXT1tMvtFpJKbuDcyXIC7m8yeb84hHq3vLrAoX6L0NX0SCFsYaXWS0E9juHY1gj4ElVvH2P8AZ3mUwpcq7S8yhrZiI4jWUid2zE+EN4E6njqL3sMYzP6M2htOUtBJrPVma0ma1qs8yUaiSFpBbeUPdk7bnjdzbrzhKmRa1cio5Y4qJPa5f94Sg2kvJFxwpPgIA+BcdBiyPpEf+KyL/kn/AP8AGJs1zzE59CxXqumb2e07dbFpw40/deR+m6zVZ+47qF5F9FLs41HlkmaZZq3P5qWNmRpCsa2Ki54MYPngZkv0d+ybUGZQ5dl2tdQy1U9+7QxKt7KWPJjA6A4uugzinpeyrPMypdN/o4kNPUn2QJs3ME9/3V971xUWjwuQ59o7MG3ItVVslz0IEvccf/qGKy6t7CwfHlcej6LFOydxJBaSGiwcgE0ft2Q3M/o+9kOU5lU5bV631ClVTP3cyCBTtNgbXEduhGIx2o9i2i9K9nI1hpbUGbZn/vBKK1UqqgNm3cbAbiw+GLj+kLltDluZZXVUdHT09RWxVclTLHEFadl7kKXI5NgSOfU4gv0qdYUOR5XRdm2Xafp6OnkSnzj2qCQIoYmVSvdheptfdu+7FoppHTOjNUP5XFrNHpotFDqI925981WMH14TDJ+wDs7/AEM03nuotVZ5Q1Wd0S1QjhjVlDWUsBZCQBuHU4c0P0ZdE6oqoYdJ67qKqSOVHqqWqiEcpp9wDtGdo8QFyPCQTYEre+Dmom29lHZlb/7nP/8ASLEl0dDHT9utXDBGkUS98oVBYAGBCR+PPzxF+reJ/DrFgfddsHRYZOn+Z3Hftc7tXumq4vuojT/Rk7L6rUj6ci1jqFs0RmRoO7QWKruI3d3bpzgZU/R97MNJyHL9V6zzqXNAbvFlUalYb8qrfq2N9pBubX62AIxY2Rf/AFhaz/1mo/8Ad8Du0TJcw0rrXNs6rsratyXNw0feq1gFkjRGXdY93ICvhJFjcAdTYO1cgjLgOHEfRPB0XTO1DIXuPvRhwFgEuPYEilCsq+illeb6lpaig1PUZjo2rpJphXQBVnp5kKju3uCObk3sD4WBAsCVsj+j72Rair6XL8t1vqCWpqr9yhiVN/hLecY8gTi6NOVWQ5X2SZrWabmq/ZVgqZCKs/rYptvKtx5G3w5vexxUmkl+pM60dmi+FZq4xgnptEgha3yDtgy6xzNnGefQYS6PokMzZy4uBaSG9jYBNH7IDQ/Rv0rprL0rO0bU2ZUE9U7tS0GXoDOIQ1ld7q3JFiRtAF7Xvxg1kf0XuzzVTS5hk2tc3lyqnibvoXjQVML3BUm6DwlQ3G3k2seuLI7ZdPZxFqLLdXZfR+209FEiypt3iExyM4Zk6lG3kEjpt59cZ7L8y0zS5HqDOMno636wEKvW5fUVAdQt3ZSjbQO78Tc2uAOnkXGok8fwjQH/ALhczum6f8OGraSXd6qgbqiORjgqoE7EuxaSETLrvUOwqHB9nAuPX+qwXzn6M/Zdp+noajMdY6ggir07ynPdod4sDfiPjhh1xJ6nT2Tp250+RjLKIZSZgnsIhUQ7fZGa2zpbcL/PDzttnWqodPd1TpSpGauFI4z4VCOEUeXFl6eXTEvNSiN7zXuml2/g2kdqdPAwuqRu43WAQfl8lD8v+jF2Y5pkNZn1NrHUMmX0Qdp5e7QbAq7m4MdzYegwIXsE7Ja+QUtD2h5rTVUpEcbVdOuwMeBe6rxfjqPTF2w1FNVdjmpZqXTa6eX2KqVqYR7e8Ii/rLbV6+tubdcUkyLPksdC6xUqSV0t8ylBKLuhhXu2spNlA3n03+XJxp9a+MNqjYTdP6DBqhKXFw2uoZGMXmufoqU7QNF5p2b6srdN5tsaopipWaMHu5o2F1db9QQfuII6jAAVbYur6YTs/atTIyMO7ymnQObWlG+U7h8OSOfQ4oy+PTXyKxi3/ovaoyvTPaeFzeoSlp80opsuFRIwVInYqyliegJTb82HzxUhjb9nHtmMsDWV1+3ZZrmjy99OxZVBVRe2JVLXLOvdsVjeMdTdQQ9zxcWtz1xK9SZTQ6t0vS6FyHOsuzDUOlkp/aqRZrFgIjGwB9efuNgdpIxxfT621VS0YoafUmdw0irsFPHXSrGo9Aoa1rYGUdZVZdUR1VFUT0tQhuk0LlHU9OGHI88cbNDG0OGTePovdl9oNTI+N9AFhvA5PFnP+qXaelNI55lep6XVGqaenyPLcrgjjd551PeFIRCgWxPJ4Pz4AJODOpeznONQdoua1zUqrldbQNAtR3i3WTuNqnb14cDm3kMcR5nqrUmdrGua57m9esTB0FVWSShCOhG4mx+OMnWOqP7RZz/fZP8AVjDRMDNhzm1N3XNQZfFAAO3aK7DnGV3R2R6Pz3TWR55BnFCKeerZWiQTK4b9Xt6jpziu6Lss17FkaZT9SwKjyxTuTUx3DojIBfd08ZJ+75Hlv9L9Uf2izn++yf6se/THVH9os55//Gyf6sB2hY5obZx/KrH7Q6lksk1NJeQTY7t4rK7b1toTUVR2eaX07lVLFXz5csa1JSYIpKQlbgta4LH8MC9Pdl+odMa8yXMKSjeXL4ljeqmknjJR2jYSKBwSFJFvh6442h1VqKnhSGHPs2iiUWVEq5Aqj0AB4xt+mGqP7RZz/fJP9WC7RRufv749FOLr2pjhMAqjuvHO7n+l3NqPRme1/a7lOoKejD5ZTiASTd4o2be83eG9z7w8vPHHna/ULR9tOpqiSnWdIs4lkMMnSQB77T8D/A4jo1hqj+0Wc/32T/VgXUS1FVM9RUSSTyuSzySMWZj6knk4vHEGFxHc2vP1OrfO1jX/AKBQ/ZdqapyCs1zqCj1rpyhpdUZHmdIioq1AUJZWQq3Ph2sSeLkMCCARgv2VaD1LpfUjzZ1SutPFSyJTvFVK0CyOUL+Hg3O0c2HIPW4OOI8q1NqDIYZKfKM8zTLopjukjpKqSJXPS5CkXwp+l+qP7RZz/fZP9WIjRMEni97td7uuah2l8oQNtAd7ocd69M91bH0bcizDTP0g4slzOnaCtoUq4Z4yOhEZ5HqDwQfMEHzxeulNE6g05VavzDM6LuKepy+qWFxIrFiWZhwDfpzjihM5zZMwOZLmVatc3DVIqHErC1rFr36WGHTau1M6lX1Bm7KRYg1khBFunXFpIQ9zXHsuGDWPhikibw8AH6G12/qPQ+f1/a5Ragp6JXy2PuN03eqCu1XDeEm/2hjbsS0Xn2kps5bOsvFGtTDSrFaVX3FDLu6Hj316+uOHv0w1R/aLOf77J/qxj9MtUf2izn++yf6sSbpGCTxBzZP3XW/rM79MdKQNtNb86abHryuwNFaQ7R9G5w09DlNKsVXJFHVNNKj2hElyVs4sQGY+eKv11qqj0T9MSXPMw8NFTVNKk7/8NJKGOMufgofd92KPOs9Uf2izn++yf6sDayuqsxqHqq2onqqh7BpZnLu1hYXY8ngAfLFIIBENoJpQ6h1B+teJJGgH5d/3XZlZ2fao+vc6myGno80yvUiTmLMEqV7pYZ5BLuuOeOgIDAggj0xKck0Xn1L2PZtp+eh2ZpUmdkgMiG+5gQNwNscNUGr9RZXQ/V9Bn+b0dHyfZqeskjjuTf3QbepxMZKvPvZaVlzrOd9QVUf0+a5Nr39/4Y5/Kxxkus5v1XbJ1zUzMbGQPdLTxyW8XldCVfZXq+XIckpVylWlpqqqklT2iPwK7Q7bG/NwjfhiZ9s2jM+1XNlTZPRe0rTrKJP1iqVJ226kX6HHFef6nz6grPZ4dRZzuVQX/p0p5Pl73pgYNaam/tFnP99k/wBWM3RR7C0cGvRF3X9T4zJiBbC4jH+XPdd1ZjQ691H2bZxl2cZfS/W1RNHFDDTlUVoN0ZYkl2F7b/P04xBKjsd1XS5bllZQ0TvmYZ5Z4WqIwkTo4MRXkdQLnk8jHKQ1jqj+0Wc/32T/AFY2/S/VH9os58z/AONk/wBWGk0TH0XE4Q03X9Rpg5sLWgE3VY4queP5Xb3bZorUGsJMmkyWh9o9nhqklDSom0uYio56+434Y56+mGjRdp+Wqy7SMkpx+EkuKlXV2qG93UWc/wB9k/1YY19bmGaTCozCsqqyUAIJJ5GkYDra5vxz0xdkIa9zx3r0XnTaySWGOB3DLr6myuv/ANDc81b2UdnP1PQrVez5QBLeRUI3JHtHJHWxxINFaN1JQ6+fVmpoaLLYpNyWNQp3zSbY0RRz8Bybk2ABJ44sg1NqKlhjp6bPM2ggRQqRx1ciqo8gADwPhjWo1Bn1U0TVWcZlO8DiSJpKp2MTD7S3PB+IxM6NrpPF78/ZdkfWp49L5NoG2iL70TZ7ruHKdD6gp+2Op1FNQquVtNM6ziVSSrQ7R4evXAPVGjdQz6qzjUOnKOlz7Lc8p5IVaGoUiMPGsb3BIBIKEjr1sbWxyB+luqP7RZz/AH2X/PGMt1VqbJlkXLNQZvQLKxdxTVkkW8nqTZhc/HAOiaWltnm1o+tzMlEtA00NojFDjvyu18r7PtQZX2S5zkfcRT5rmdT3pp0lFo1bu1KljYX2pc+XNucROTsf1ZTZflVXS5e75iZJZKqE1MYWHZIO52G/2luTyefTpjlNNTakiaVkzzNkaZ+8kYVkgLtYDc3i5NgoufIDG36Wao/tFnH99l/1YV/T43V8hStD7RaqIuc2veduOOcVX7LuDtO0fn+Y6kybU2R0sdbNQJGJqMyhGukm9SL8EElgefIdfKP6ay2q7N6POc81R7PlsudlMuoaHvFMks0sjbVCgngFxwLkKGJ4GOP4dVamp6r2yHUWbRVW0R9+lbIsm0XIXduva5Jt8ThvmGc51m9VHWZjmmY1tVFYpNU1LyOhv1DEkjyw/lG+J4t5/qlzfjE3lTpKFEVferuvhz8l3LU6Jz9+2uDUa0W7KVmDmfvFuB7K0fu3v7xthl2haKzzVmW5T9U0PtHs89cJbyqhUtObdSPQ44v/AEs1V/aLOf77J/qxgaq1NEu1NQZwvnYVkgF+vr88Y6RpY5nxNos6zO2aKYAXG3aP2zz913jT0etc97PdR5bqCho4synppqaiigIUOpisu472F9xIvcYreo7KdZvpH2FMo/pQzKefZ7RH7jU0CBr7v2kYW+GOVv0t1V/aDOf79J/qxn9K9Vf2izn++yf6sCTRNkA3E8Uqabrk2nLvCa0AndVYuq+Ktj6YyMnajlyt1GS04/8A5JsURgnXVWYZtMJswqqislChBJUStIwA8rm/HPTCApG/Zx1hpXil3dbMNyjbjUJvt9r5YLRiFqWojZk8UZt5bSOR+dsNUi7r95j6+QwwagXJsKNvteG/r1xoyKjbWw8HeTsVTxefHAt/P34Xjo/ZW76ZizjlQwve3lt8/vw+0dkNyHbcKVFOqLHInut19AfTDmKkmlmbuqVkiLcAkXAPl8eL/hgrV6dm9jFVDNuiiv7QhXayDyYcm6k2HwvfCUjaAbfD7uPCNXtsXxeYwQFCvu7dkR6P6j1w2mqo+8TulZfCFbjapt9r8LfxwS2lgVh6RVhST1uDz0w33x+6y/54Mz5bN9X98rK0AP6ywuV9COenx+AwP9hj2hvFt8yTtAOAGgrWkB3f2Fb78KpT7ody+8DyD5j1w4njjeSKNFVdoK7i1rjqL/nb1vhw1AqLGqVG1nAZSfDz+yb3P3g2wCQDSItDGg8Q937jhVaHdDI233But/P3Y8Kmn7t12l3Yq24D3T6fIi/32w/pVkqqOWSKPxKCvdta7eth52HNsHA5WyhtPSNUXVfeHl6/LCy5UzxiTw8+Xr8sOsvo5J9k0TKtyACeSD6kDm2M75qKs3VC7J4mKslrqvw+RGBV4C3GSmbZd+rLbdtsMDHtbbg3JJ+seRGVoiSNrLYqfT4+mGxgjqJN3dsq3sV8wcEMK24IRJH1wkcPqyLuJHj3dOhPp6YZNhaRW0Y8S+718+mLrr8lqsuhjaaNVWhimkLt1YKo37egJ8J545tfrir9GUWV1+fU8ecZp9W0o8Ym7rvLuCLLb8/ut1OLyz7MKHVul51pJoEqmpQDTe0Juik9/uTJ+yx3C9wpuDbk45prJAVohyVzrVTyVU7zSNd3JY/M4RGMnyxkbcdCilqeRUk8a7l9PPBuLKfb6N5KFllb9kGxHw+fzwGpqaGf3qpYm/eHGDNBQZhRyLNl9VA7r5g23D0I8xg7SeEC4DlLZdp+aWF96ojRMEIkupB69OPU/hhxUaZbu07pvGSqlgbqxPBt1+eJBS51ldfanz3L1p6jgG4urgH3gRfgdbckc/E4ki5VRo0XdKixRAyRhQGBBBAt8CCemF70tahE2ndi933e61gPT78DZciaJTJtbaPeX7SfMYsScQxU8tQq+EDgMLMT6W8ufX+GBlXIsVO9Uuxk6oxO0qfQ2uCDyb/EX9cMHUhttQr6p/dxn6p/d/LEpK0dRIFhmgSqdO8EYHDC9rH0N7ix+OMeyrzvXaw4PHQ46mBrlzPc5ppRcZR+7jYZR+7+WJOKeP7O3GfZl/ZX/E4fwwk8UqLnJ/3fyxj6p/dxKGhhRdzsqqOpPQYG1dd0WKNm9QOC3/fyxN4a0ZTsLnHCCvl6q21V3MeOPLGyZI32/e9ME6+Oag2M0yxO3A2Dd/zCxuCBwL3F/LClJmKy08m6SnZhYLtO1ifM7T8sRY9rjlWc17RaEJlO+Qqq+FRbjpfCwyb93EpoMuXuU3Ku4jcfh8MEosm3+6vX4Y6GRWFzPmzShCZN+7+WFRk37v5YnSZJ/wAvp/P542bK9rd2kbOw6hbcfj88V8IDlJ4xKrqWnbLu7p2o0UVFOJHRiQwDXsPyvfDRKeOeTb3nQktYcAdfz4w5zqvbvkV+6ZkBAZDcBPJfu/xwM3MyuyzKvQDmx6df8McMXxK9CUC6CMyGnpY02Rt0sL9Set7dODwD1wwjnkeTvJfdFg3oSTYXPre/5nDRqyHdtlm3MLeIAkffhTMDDLSr7PUQXBL7Ebp19fhz95xR7x2U2tJUkhyCSvh3S+0OrDaqUqqAh/aa/UYZ6kNHl2dVi0lOy96yyLLOqgspANwBwFvf8ObG4Ek0HX97Gm6T+sXaCPsn/ocR/XMlPRzUlOlR7YyI4aUrypLeK58+nrYcjjEGu96yuhzPdwgE1VIqtI8jNvFifh8PT7sPqTKKqtzCjhWN5paiSOCNYV3FmZwFHlckkDA2oaGWN+6mVrAEWG3n5H78Srs6qWl1dppWbrmtD9x9oj/64Z7rSNaByn79jXaQtRI0Wh862ksq3g4CX4Ft3S1uMePY32lbf/mPnn/7I4+XOLgzjO9R/oXrmTKq6sfNIu0l6ahvMxsRKmyMc+5ew29MCtRaxzSLsW0jrj26vp/aavPKR1jqpL3qRU90pI67Co2kji3FsYOIFIEKsKbsU7R4pu8fQ2dP8DALfxwrW9lXaFnNDR11PovPnga6RuaYhiGPXabMF6eIgC3PTk2xqzPa7T2pOzmllzjNElyXKsonqo0eUxVTy1CrL3rC46Am7mxvbk8Yl1LXxUH0i39ozavr1q656aF6atkjFJKKTd7JPTP4Xi2+NZI+jWufIJWbTXilzfT9h3aQ9QkL6Jzve4LL+oslha+5iQAeeATzzbpjZexftIlZGi0Tnyot1F6faQRwTY/Hz8xYjixxckmZVlb2baUpa7NK32Or1NmUVU3tkkRlVO/KK0isGsCAQL24GA/aLq/VlBoHQ2aUldWyvJpOoGYk1DKXjkMUCynzZg8kbA9bi9+uCgqzzLTFdp7L5aHMstqstzSFkM8ZBE6qeeSG6EMOPQ4FUGWNWySSLTyunC99K3Kj1A8xxiyu26vmg7StQyd5uanoqSRY5ASrMaSIeL8+PM4imi2Wvyvu2p1lnSMqjM1rkeV/jhGEtsKrmh1KKSZj4Qu1XcC5a/hHw9TbjnjnDHvpJZnklm2qTudoxYX/ADwVzxIU1QY+5anTvAs0TdDJ5lbeR4PzJwZzOhoYqWNU2K04LKSttoFiRfFXSGgpCNQepXexZZGfgdetsM2FsHc3oo6WRGibcpGAkvvYXnKJW9H33tUC0/8AWmRdn/Nfj88WqU2UNTs3d17Muw2uWALptPpwEv69cVNFK0UiSJwyMGB+OLOrZ40p5KdNrQFZkQkWJAIIHl8euEf2VYu6rGRdsjKPIkX9cagYVqf/ABEu3hd7W+V8KUiru2t4vh5HDqKRH82wb0xonUmspp49OZLWZlLTKryimXcUBuAT94P4Yw+W07wmbxo37vS/+GLP7IjJlGh+06qoqqVJPqOGWKeIlGU9444I58uuACjSjH+xntYC92dJZ8V4sCl9p+HPH3YlGRaE7S6Kljo6vQueXUkiRYbg/MeX53xMuzDUmoMr1NqXNM4zKtqIsu0tXRpA9Q7IGoRDC0gBNtzlC1+t2PJ64daB1XJF2CdoVLLneYy1VJSQVaVVZNIkqPU0cR2qz2Nu9VwtuGuCLggkoKGVOg+0J4aj/wCJuodsI3Pam3ADr4Vvdzbghd3pbywNzPRuv8ppZ66o0dn1HTxLvkk9lLxqg+0wW5FgOtrAenXFgdoue5lFqjIpIs2r0lpNMZPV0apWSKO+eujR32BrOWRmU7gbjr0GDFRmeaRfSWrF+sKyKgXPaKkIWrkIAky+Ru67i/dlHZASx5UgEA3ONSypjTOh9YZ9SnUGVaRzmso6/csclPCrRMim3HiF+VP33th7UdnHaa7P3Whs8222hmgBbz4vfpiw8hkkpf8AZHlrSRU9E1ZnYmpWzSSkgtHXHaN6+/tsdqkWa1uAcSHT2r5J/pM10a5lmLxV9VmGVCjYyezxGmpadgy38G4sstwORwTbcL4YQLQVTFL2cdp0S9zUaHzt2VB3bLT8gDyJvYn8/h543j7N+07aN+hs6Vv2lgBv8bE4s76NhrNS1VdlOd5lmU9HmWQmfuvb53M4FbPEZi5YGFwECAR8EANcG4wwy6vzal+j92fZvRZhWy5vmeqojNJU181qlxPPGqO24lUKooIAtxexPOGD3BL4bfgq6PZd2nVU3cnRWeb9hdd8AVLD1YnaDyLDqfIHnCGW9lnaKzCsbQ2oWNgUV6Xbt+O1iCD8D/jiwMyznMKjsf7N1rc4rxBUxZzPUyGskUyyxRStEWkDAnaw4BNj6EcYU7TNSZ19X5DUVWdZjBPV6Go55JFqniMtQauG78EeMgm9uSCcKc8pmgN4UJk7N+0l/d0JnjXYHbJACpt68+n5m/lyNXsQ11KN1RonUZlZgzMkKqL+gF+Bz+WLyzvVs1P9J+hj+sswWCjqKHLGog0ns7mopJ2LNbwbgzRWB5PJF9ps07KM7zas7VtSUOa11U1FTfXb5YrTsyyTe0osg97qiBdq2IAZjcYAFcJib5VJ5rpPW2iPZqzNspznLMrNTHG01YllJJ92/PkG/DFw5RpahzJR+r2Mx4aBypA9efh6f54i2ey1Ff8ARUy2ueZaiobOkkqJjmMlXKxAdQWVv6phYDYptYBurEYl+gqr2+jp2pJIp96I/wCrcMenmL/HDscRwVORocbIWW0DWJm36nNtsF9ppp4FuTsvw/BvyT93pzgfmehqpMwdWqqVd5UBVnkQkni3C2N/Bz1sDi0aQstVulVluwtcFbi3/bArU7U8GX1cbL3srSNWQllBAkBDAg/un43AGKumeAotgYTlcY1E3es7O25toH+X5YxFI20Qp7xvc4bOeke74k+p/m2HeVUU2YZpS0MO3v6iRY4t3Tc3AJ+F/PyF8IMK+U5oNPVmc1ax5bSz1jhO8kSNLhEv7zN0Vel2awHrgwuhcymV/ZqGnrJUG4xUFZT1clvXu4pGcj1IHHU8YRrKqTOWXJcmk9nyGje0dwQKpxx38o+07dQDwoso4HLyfSjV9RPXUns9A42vGIpCBGb3uLAc/gB6enLJPG0040vS0vStZqGh8MRcD3QWjzeoySodaVtqliTGwuFPnYdcE8zrWzeojqKiSJp9nKg2AHyv1PF8H01LUao0TmOXZjFBLnWX1VP39fIwEjUu/b3jsfeZX7tC17sJFvcrcg6nKaWvaSSKqgld3MivG/IHoFJsbdOv+WLxRl4JK4ZXeGQB/wA+SE11CqL33dpsPU7enzwjkmb1GQ5tR5hRbO9o6mKqhDgld6OGFx6XUX+GJRo5mizKno8whaWnMwUsybgl+gPHQn+BwH1Vm31pnVTUPGtOjN3ccZXbsRfCAR5MPMHzxMbg/aeETtLNw5VjR/SS1XtmWPT+iv19aKxkGVW76puCJz+s5kuAdx54HOE5PpEamrMviymbSuhp8tjmaaOnbJ90CyHdd1Uvt3He3PU7j6nFc5fQ97smEkDIoJa0o3EkWAJHu/aNuvh+OHMIXI6x5KihqNgQyIrBHA9TwbMLehv+N8WLcKVi1YWY/SH1hLI0mZ6X0VL7TEqM82UFzJHE25A135VWsQDwD0x6L6TGr582TOE0/o5c5P6s5iuVE1JTp3feb77bcW64DZ1EupWMlJCytQ0qiwBUGQ+N1v5EKI7X4ubdTiHUaQtXR1FNVM6RASbmgvyPsMq+R/a8r/DCMBLc8p3EA/JWXV9vWsPZ0yWr0joefLgzznLHyjdBI5a/eFN/vXubjqSSb4dS9u2vq/L+8q9N6OrKeKCSlvVZVfZTk3MNt9hGNqjb0Oxb3POILqtaf2yDPIplWCotGsRazxOByLeY46/EcepTLsxbO8hkyGHw5jXvFBC0SABgzjcB8kDH8sJ75aCPqmBZuI7dkG1Vq7PtaZ5mueZrHRpUV9PFHJDRrsjAWNQpAJJFgouL9cDMgzybJqgw06pLFKQpSQ2CnpcnyGDFHls1BmXd10LwyszbUYeFhfybzHlf8QDxiQ9ptRDW/UHs9D3ETQSNI8a3vyoI4682FviMEh24CsHuiC0tJvIUCz6JqXMp5u8393IGTbYqw6XFuo68+eCM2dx1uTlYpFTaApTbcknp93BxIKOhyefL4pM7o2qEiYi6y7SUtcHjqfhivGkXce6XZESzot7lR5A/IY203TuyG4AW08rWoqWePazdP5tge5wtIeuG5w6mtcWLJH3vtrIssrQs7QhV5CFBYjjoeefgfjiusWFXOrQ/ZZngXvFbzIK8fK34XwhVWC7UClXbIyjoCRhxRrvk/DDaX+uf/mOHWXt+sH4/9P44JU1KKBG2hW8+eOvz/wAPhxiVaT1JmmiPrRsmocoros1gWCrp8ypfaIJUVifd3AeZv1B+HXAfJIo5VRXVWW9weliPMH7/AM/uxK6XJpkXwfrUNjvPBQW6tz62JI9enniDiWnCs0A4Kcy9vuskaoWq0vo2LvYJI5+9yY/rIpGu6N+s8QY8lehtc4WHbVqWvo56f9H9Dy09SkIkhbJLrMkQtFuXvLFUAG299oHFsOKXJI6iNP2W3csFKn1tyb+fT0N7YTfSVHt7yGFEdY2XwkhT8LgWWw6HpyTbzwnmE3g0tT2xa4nkSozKl0vmlfTuz0ddXZRHJPl5JvaFgy7QDYi4J4FybYcP216y+sDmTZHopq0yrUGqfJz3jSqpRXL95fcFJXd1ANumG6ZTJ7Q9P3dPK4jaaxqYonsW8I2bmbkWIJ4t5+WHv1AvO1VZVYqSrbwCOCLjzHmPL5YPjEIeEFFqfte1ZkOT0eW1Wm9KV6UM81RTtmGW9+0bySmVmRi/HjYkAAWsPS+JDkXbVrbNP97Q6f0LSzrUvVRztlREhmddskwYPcMQoUt1IFjwMKS6YjqIzG9Or7hcqyhQbf8AW2BX6CNS10S0tQ9HTnhkNnJNiQANvAsTyb/ffGGoQ8IjKL0vbFr/ACG1Vlen9B08ohMG+iy8RkRbi+y/eDw7iWt0u1/PARfpDawpssp8vp9K6K+rqCUSwUseUWjp5L7g6IHsrbmY3Fjck4KJkMbSRrUU6LKQLBirBrqCSOOg59DxyB0Cr6bXcWXb5XW1x8rC/l6evS/GB5muUxh+CHR9uedZjlcWT6j0bpTMcjCNfJoaNqZUYm4dWXcUYG/QD3j584d5/wDSHzzNqyjkTSeme6y+NFpBm0D5jLTSKb96kzlWDHw9bm6A3vjzaYjlkSaLas632yIdx+RvwQRfqLH0HXAnMMjqqeqkqKvLYqynY3LQQbWQdL2PJ+Yv164YagJTCUtJ9IvVUuYSzfUOiJa15oqp5mykl5JkG2N2bfcuASFPUAkC2Nv/AIQOrctqI6qPTuiYqoNLIJI8osytL/WtuEl7vbxHq1ucI0eislnkSqgoXRlBIB3KFJB5I45A8vLGtbpOnijnmXKYq19nGyeSN7evvEcW6Ac8c4InBSmNyb5h2pZ1m+QvlcuT6ayjK4ZkrniyfLzSvLMq7UU7W5+yDxewtcYhNdmLT+xs+X5ersqVRljg2yu1yCCwPIuD94xKZ48lim+q6iNvZ12uZGZgwYg8Mo8XH3g9fjhWbT+RzwxdzUJL3UZj4nuQu9mBX73IsfK3TrhhKpujtI0XaznlArrDTwKrMX2+0VRC/AAzEKPgOMOKrtp1JPTyRptgdhsEqO7Mh9QGZgfvwGq9MwossiVSp3Vt28r9w4N+txxe54wDqqWalbbLHt9D5MPXFBKSKUXQ0bUdnjjWQN6kgg+RwS07Vw5bqDLq6ZtsSVCq7cnavRm+4G+BcZWVgre7e5wtSDfIW+wLi588VGVVSfTlIctqKvLK20VRTzMHW/B6Dj1HHB9MSP2+NqV44WVGFhtPUj1Hx9cReBqeqhVcwaeKWFQkVfAAZQg4CuhIV1HIBJVgABcgAYdwZVl/jkOoK2v3BiIKemETy26r3jEhOo5Ct8jjzp+nulfvBX2PS/apuh0w07mWQnekKSGsGqMwro5fquohiy+SWJTujJnikMgtYEIsJY88EpcWOGVXlE3MkVRE89OfZqiEqskTkAfrIybXR1Ia1gQSeMaZfnlPVajyz2ujVMmogyDLoCSsaN1Y83kckqWJ5YIB0AUPc9OU5XmFZl6VEVVle7ZTsjBwqsFZG3dboCV55IF7c49BjaG1fITymSR0h7m/um1ZUZlpeSCSqocuzKAruSfxji1tp5FmHh55NrcnGuoqiqqoaDU0uXvFLVU5jqCm5QxUbEmBPG7oCR5jmxNziaqjgykUtbH30Bcx90feiCjgXAHPQA+luuGGS5jDS1CR1sktVQRXjWGRAVDm5BZW4Kr1PmDY4dwypsNotDlzZ3DTR1dLPsqljmaUDaEQJ3cbGwIHKObHybzwJrsump4Zcv7l5XBMm+/BHAL3Hlzt54v+GLb1NmeUy6FosniVWrIFSkWUfq5KYKNwNwOVJAUg3Uqbg3sDVTZpNk1RFtkR2jMUhhVxaMjki9iByFuOhxKFxe0mleZoY5rQptkOV1Gn6X2XvolzHYBAiAslRKpMlyxFhZQDz5KevlHtX5Rl6Z1I2WRypBMq1FLLGLHbIodVBHUAMoseR+BwxptWe3Z1T1UO+nnCsr+BCpLcMQOOq35uCOflgo1TWVUxmpO49lhCGNNvuqrGzH4EcenAw0bDdlRlcB+VCslkqK/L8xp8xroXsCwimch2kC+FrlSCLAjm5Jtx54UolzL6rzDMKSjWl7h1aDZuC3ZB4kuPNEfzF94A8gWubGhlzZKir3xRMEASLxKyr4mLcgnyAt634tbFg6e1J/uOkymmkRpZmSDvBMe7eG254395GATcoBClbccjCzOLaoWqQsa+y41hRLNcxzLNspoc6zOE0U+0yU1XShr1Ed9jt5jhwdwuCGY8C5wPGa5pUZbTVjxzVTO0sUfg8IUHxX9L7l5Hmnww4otRyU9C+nZardQQSSNCLbmXdezK9jYsWFxaxNjbEgpc2y3Kcvy1ZqGeOqpQqFqNhCZqZf61JLWDN53sG3cHqTh720la27Kh8WdVG2WheoSqVkDpJE23k2vdehIFx8MBJp1ZnmRW7okgXFiMSesko6iaeqij2byUjL+8isSQDtNuOT0t5Ybakloc0zSKSCnWl9oUO6Io2h7clfgRY28jgk2lqsKOSFXjDet8N290YITQxrDGu1twH5+d74YS+94fywpTJLE9rl9+Nm3bN6kr0vzyP55xAsTusEneSNt3951f9kFOn8cTcqxd1CZhtmfysxFvTC9JJCrDvWZVv1HUfHCNQNs0nn4jz9+E1O1sMpKxdPT5fL4VzKnVzyFkYA9Dx5Hpxi38iyesqo/6LVUcrAjbvLWZuOeCeLHy8+ccvqfFu8Prh7BVrBD+qjdKgtfvo5ith6BR/nibowVRryF142g80ltJS08Csd1naZiCTzcqAoBHNiObD1w3k05qCl/rcprNqELctuVuOvDnjr5X6X55xy3S6s1BRsPZ9QZzTrfrFWyKQPUDcL/jg+vbBraim/oGqs8aBWBjFZOsrC3F/EpA6njEHaW+Crt1FDgK96nJ6iqWOR8pzGBlHhkih7src9DfqpIHF+R055xFtS5fnmW1H1hC08ChhG/iZUlh3eDgXKyC/FjtsD5XGIJTfSB7RqONGXVTM62QQPl8DDb89g+WCkP0mu0CKFGfNKOWQnlTQKAvxuDz8rYUaUjNrGbtQ+6mOX5jXezmoWj+tqJeO8SO1Ur+aMoO0sCfIjjkXvckIswy+vjEa1EtHLIt+7IEMyjrcK5P8LWOIM/0odcMzq65HOvQu9Gx3A+niBH34Uj+k1nzqGmyXIWluGt7ESFPqpMmAdM491hMPh6qUpPNQMKGtkTMaOZiiO836xDybcklyo+1cN8zh7BJGzSNS1FLOqsd0XeASIbgWPABAuegvbya5xDX+k7mjqY6jTeRyo1gValaxHXkd4fPCcn0lZG7xX0TpmVJCTIPZ2AlPS7eLk/PnA8s4reMB2U+Uxyr4VqGa5G0qGIPofQ/M39eecCs4zCupYxNktPS1CQzNHU7y6tHxey7TyeRxbm/QdcRp/pH08rM0/Z/pp2cHfYuC1/XwnnGtL9IDJaVSq9neVxI7s5SOukVQWN2Nu7I5IBPrbGbp3ArOlaRVKRZNnFDn0PeeGKoUeOMsCVPQMrW93pxe/ww6nLJfeu9OLOBwvxILEDyta/l8sQas7adJ1Wxv9nNLE0bl1NJm01OQfW6RL1+OHEfa7lM8nj03LRsNvdKtazFf2SWKj4ny4I9OS6AjhKJRWUazPJ6OtYyNGqOVMbNa5ZTY2O5QPIc9R5HzxGM9pocpo4u63syswMm7vCAei38RCqF6c9XPmcE5Nc6XioxVVGT5pAvG7uqkML+Ztx8ecC6jtE0fUR93/vfaw5WTxD87jDsjf3SOc05CjOYVELx/unkoVCkHyPnYn4dRhBZFlp+5SZXUjiOaS1j6rb59Dzx6YXrc00fVMe6qM3p1BJCqiEfMXU4EV1Xkvds1JXV7y9QXjAv+FsdAaoKOq21cO6FV7t9/qCL+Xxwxw6hPh+7FmnKBTt6iSVtqruuQLeowbyqnqIGikZk2p1Tbza1rfhfAODrv+164kFB/V7fLp8eb4s2lNwQDN3kpa6SPcySg3Yrxu44I9Li3GJ1R1cctCmyRH8AX9r+fPEM1KPDSTN4pGVkLHqQrEDGlHWTw0RlSVgyqE68WJ6YS8pi2wjedvHBR5dVRbnYqUmseGKnr0tfqLf98R6mkan71lXvVEciXJtYsu1j8eth88K1NRIcupot3hjke2E14ownkzhT8RuP8/cMG7WApEMqzqb6vljqP1vcQNDFLIt+5jIvtB63uoA+BNsNsuSNpGabxqu9m3ciyoRf53br64WrHZcry6FGKRVBd3RelwFtb06/yecN4QEy6Ygf/Yon3M1z/H8hhRjCbk2mVPuiYTDwuSBGCP8A2h8un3/DExynO4YNPiMxpviIVkHBZt3T7wFPzxFYFJ9hLMzbtwsT0A8sEMzgWjq5zAzJYq4tbggXH5jBaaQItbZ/LT1+bBYY2WLgk8XUnkjjj4YH0stVFmUkkUnVyjP0Bvfnj5eWE6N2eqlYnxBSwPoeuHaIpyysLDdtYMt/sm3X8hjOooDGEjI/e1EkyKrWu57wkggetvx+eM/W81VCWlZmqAojV7m7fE+pI4J68DGtEveQTAk+PwkjrbCc8aw15hThFtYf+W+MURdLJrpomWGZmnRAShJsR8Qev3Y1r3aWSNWv7u7k3Njzb540qn/3gQVUgcAelsYjdnqC7G7WLffhfkitGqml8LeGwt4eAfjhucKDrJ8sJnCIrTEwlzrL/dWq3qQGN1sbeQ8+eT+GIfjbCkWnDiOErVOstRLInCu7MB6C+EgrY9helY7wPjgoAWtFwsm3938cHstoYZ50dtwl3JaQHkXa3y6eoxL4qKGlkMYUPsJ5YC56+lvh09MQknDBkLt02i8Y1dKuF2/Z975g3x513L4fe/LFnrULG/dCni23A+0P4HBOkpYKlEcwRKSFPCA9Vv8Aavjn8+P8fVer+AY/P6f2qhUruSPau5rW3Yy6K/2YlsegNsXLJlFC6p31NBOgIOx4UANj0uACOnkRhWqyemoaCmrYhzUb/wBUVXZGFYABbDd5/aJOMNZYsBTd0QCTY5/p/apZY9/2U+XU43WmkdTtp917fZP+WLYpaou9tir4x7rMPUevwwWipt0Ibvpl+Aa48/X5YQ64/wCPqugdBjHLz9v7VHvQVCxjdTz+G9yI2IHx6YVTJq6VQ0VDUOp6FYmIPysMXNIrIvEjfeB8Ph8TjTL2+ta40s4UWieQyqPGQiGy83AXgdAD8cFutcf0pJOixMFlxr9gqZbLKxGCvSvEzAFVdSu4eovb44WGnc2dSyUMrbTY8jwn0PPyxZYpqbNoglXTI68ngsOefMH1F8bjKqPLqeT2SFYRxcDkH53vhvOEi6SDpMV/mNfRVmNNZxt3NQlOSPGyrcjra5F/mLjGV0xm32qdV68d4p/xxPnqpA0nCEEKSNoG63kbeXA4w3rDtr6WmbxrPC0rMeCDfoLWFvuwRqXnsonQQtwbUEfTGZJ4jTjy53Dj4/wwzny+alk2y7U6EEni3rid1Xg9349ef44DVcKzQybuLc+EAc9L/HpizJXHlcsumjb+VRiSlZF3bon/AOU3/jbDV8PKod07Bb8Ejk4aMcXBXC4Dsv/Z";

/* -----------------------------------------------------------
   OPTIONAL — full auto-publish (pulls EVERY new upload itself).
   Leave blank to keep using the VIDEOS list above.
   Fill both in later to switch the whole site to live mode.
   ----------------------------------------------------------- */
const YT_CONFIG = {
  channelId:  "UCCq6eh7b6jurNvRWFqfz8Hw",                 // David's channel
  apiKey:     "AIzaSyArQ_T0p9XbiMhG37fccPC8jWKi59coouw",   // YouTube Data API key (referrer-restricted)
  channelUrl: "https://www.youtube.com/@DavidHouse4thAngel",
  maxResults: 6
};

/* ---------- Mobile nav ---------- */
function initNav(){
  const toggle = document.querySelector(".nav-toggle");
  const links  = document.querySelector(".nav-links");
  if(!toggle || !links) return;
  toggle.addEventListener("click", function(){
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
  });
}

/* ---------- Give amount selector ---------- */
function initGive(){
  const buttons = document.querySelectorAll(".amounts button");
  buttons.forEach(function(b){
    b.addEventListener("click", function(){
      buttons.forEach(function(x){ x.classList.remove("selected"); });
      b.classList.add("selected");
    });
  });
}

/* ---------- Click-to-play (swaps placeholder for the embed) ---------- */
function mountPlayer(el, videoId){
  el.querySelectorAll(".play-btn").forEach(function(btn){
    btn.addEventListener("click", function(){
      if(videoId){
        el.innerHTML =
          '<iframe src="https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0" ' +
          'title="Teaching" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>';
      } else {
        window.open(YT_CONFIG.channelUrl, "_blank", "noopener");
      }
    });
  });
}

/* ---------- Featured: permanent PLAYLIST (Dark Day page) ----------
   Keeps the baked-in cover image and opens David's playlist on YouTube,
   exactly as before. Used only on the Dark Day page. ----------------- */
function setupPlaylistFeatured(){
  document.querySelectorAll("[data-player]").forEach(function(el){
    el.innerHTML =
      (FEATURED_THUMB ? '<img src="' + FEATURED_THUMB + '" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">' : '') +
      '<button class="play-btn" aria-label="Play teaching"></button>';
    el.querySelectorAll(".play-btn").forEach(function(btn){
      btn.addEventListener("click", function(){
        window.open("https://www.youtube.com/playlist?list=" + FEATURED.playlist, "_blank", "noopener");
      });
    });
  });
}

/* ---------- Featured: NEWEST video, plays inline (Home / Watch) ----------
   Shows the latest upload's own thumbnail; clicking plays it right there. */
function setupVideoFeatured(v){
  if(!v) return;
  document.querySelectorAll("[data-player]").forEach(function(el){
    el.innerHTML =
      '<img src="https://img.youtube.com/vi/' + v.id + '/maxresdefault.jpg" ' +
        'onerror="this.onerror=null;this.src=\'https://img.youtube.com/vi/' + v.id + '/hqdefault.jpg\'" ' +
        'alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">' +
      '<button class="play-btn" aria-label="Play latest teaching"></button>';
    el.querySelectorAll(".play-btn").forEach(function(btn){
      btn.addEventListener("click", function(){
        el.innerHTML =
          '<iframe src="https://www.youtube-nocookie.com/embed/' + v.id + '?autoplay=1&rel=0" ' +
          'title="Latest teaching" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>';
      });
    });
  });
}

/* ---------- Pull a real title from YouTube (no key needed) ----------
   Tries YouTube's oEmbed first, then a CORS-friendly proxy, then a
   plain fallback. Whatever happens, the thumbnail and playback are
   already the real video. ------------------------------------------- */
function fillTitle(el, id){
  const yt = "https://www.youtube.com/oembed?url=https://youtu.be/" + id + "&format=json";
  const proxy = "https://noembed.com/embed?url=https://youtu.be/" + id;
  fetch(yt)
    .then(function(r){ return r.ok ? r.json() : Promise.reject(); })
    .then(function(d){ if(d && d.title){ el.textContent = d.title; } else { throw new Error(); } })
    .catch(function(){
      return fetch(proxy)
        .then(function(r){ return r.ok ? r.json() : Promise.reject(); })
        .then(function(d){ if(d && d.title){ el.textContent = d.title; } else { throw new Error(); } });
    })
    .catch(function(){ el.textContent = "Watch this teaching"; });
}

/* ---------- Build a card from a video ---------- */
function buildCard(v){
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML =
    '<div class="thumb">' +
      '<img src="https://img.youtube.com/vi/' + v.id + '/hqdefault.jpg" alt="">' +
      '<button class="play-btn" aria-label="Play teaching"></button>' +
    '</div>' +
    '<div class="card-body">' +
      '<div class="tag">Teaching</div>' +
      '<h3 class="card-title">Loading\u2026</h3>' +
    '</div>';
  mountPlayer(card.querySelector(".thumb"), v.id);
  if(v.title){ card.querySelector(".card-title").textContent = v.title; }
  else { fillTitle(card.querySelector(".card-title"), v.id); }
  return card;
}

/* ---------- Fill the "Recent from the channel" grids ----------
   `offset` lets the home grid skip the newest video (it's the featured
   player up top), so the page shows the latest 4 with no repeats. ----- */
function renderGrids(vids, offset){
  offset = offset || 0;
  document.querySelectorAll("[data-grid]").forEach(function(grid){
    const limit = parseInt(grid.dataset.grid, 10) || (vids.length - offset);
    grid.innerHTML = "";
    vids.slice(offset, offset + limit).forEach(function(v){ grid.appendChild(buildCard(v)); });
  });
}

/* ---------- Auto-pull newest uploads from the channel's public RSS feed ----
   No API key needed. Read through a CORS proxy (the browser can't read the
   YouTube feed directly), newest first. Falls back to the VIDEOS list if the
   feed or proxy is ever unavailable, so the homepage never looks empty. ----- */
function loadRecentFromFeed(){
  const feed  = "https://www.youtube.com/feeds/videos.xml?channel_id=" + YT_CONFIG.channelId;
  const proxy = "https://api.allorigins.win/raw?url=" + encodeURIComponent(feed);
  return fetch(proxy)
    .then(function(r){ if(!r.ok) throw new Error("feed fetch failed"); return r.text(); })
    .then(function(txt){
      const xml = new DOMParser().parseFromString(txt, "text/xml");
      const entries = xml.getElementsByTagName("entry");
      const vids = [];
      for(var i = 0; i < entries.length; i++){
        var idEl = entries[i].getElementsByTagName("yt:videoId")[0];
        var tEl  = entries[i].getElementsByTagName("title")[0];
        if(idEl && tEl){ vids.push({ id: idEl.textContent, title: tEl.textContent }); }
      }
      if(!vids.length) throw new Error("no entries in feed");
      return vids; // already newest-first
    });
}

/* ---------- Full auto-publish via API key (optional, most robust) ---------- */
function loadGridsFromApi(){
  const channelId = YT_CONFIG.channelId;
  const apiKey = YT_CONFIG.apiKey;
  const maxResults = YT_CONFIG.maxResults;
  const uploads = "UU" + channelId.slice(2);
  const url = "https://www.googleapis.com/youtube/v3/playlistItems" +
              "?part=snippet&maxResults=" + maxResults +
              "&playlistId=" + uploads + "&key=" + apiKey;
  return fetch(url)
    .then(function(res){ if(!res.ok) throw new Error("YouTube request failed"); return res.json(); })
    .then(function(data){
      const items = data.items || [];
      const vids = items
        .filter(function(i){ return i.snippet && i.snippet.resourceId && i.snippet.resourceId.videoId; })
        .map(function(i){ return { id: i.snippet.resourceId.videoId, title: i.snippet.title }; });
      if(!vids.length) throw new Error("No videos returned");
      return vids;
    });
}

/* ---------- Decide what to run ----------
   Dark Day page   -> featured player stays the permanent playlist.
   Everywhere else -> featured player is David's NEWEST upload (inline),
                      and the grid shows the next ones after it.
   Either way the grid auto-pulls live: API key if set, else RSS, else
   the saved VIDEOS list as a safety net. ------------------------------- */
function loadVideos(){
  var isDarkday = /the-dark-day/.test(location.pathname);

  // Dark Day featured can be set right away — it doesn't need live data.
  if(isDarkday){ setupPlaylistFeatured(); }

  var source = (YT_CONFIG.channelId && YT_CONFIG.apiKey) ? loadGridsFromApi() : loadRecentFromFeed();
  source
    .then(function(vids){ applyVideos(vids, isDarkday); })
    .catch(function(err){
      console.warn("Auto-pull unavailable, showing saved videos:", err);
      applyVideos(VIDEOS, isDarkday);
    });
}

/* ---------- Place the live videos once they've loaded ---------- */
function applyVideos(vids, isDarkday){
  if(!vids || !vids.length){ return; }
  if(isDarkday){
    // Featured is already the playlist; show newest in any grid present.
    renderGrids(vids, 0);
  } else {
    // Newest upload becomes the featured player; grid shows the rest.
    setupVideoFeatured(vids[0]);
    renderGrids(vids, 1);
  }
}

document.addEventListener("DOMContentLoaded", function(){
  initNav();
  initGive();
  loadVideos();
});
