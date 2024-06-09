import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/authService";

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  function handleLogout() {
    authService.logout();
    setUser(null);
  }
  return (
    <div>
      <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 bg-black text-[#F7EF8A] items-center w-screen">
        <Link
          to={"/"}
          className="lg:col-start-2 lg:col-span-2 md:col-start-2 md:col-span-2 sm:col-start-2 sm:col-span-2"
        >
          <img
            className="lg:h-52 lg:w-54 "
            src="./src/assets/images/logo.png"
            alt="Logo"
          />
        </Link>
        <form className="lg:col-start-5 lg:col-span-4 md:col-start-5 md:col-span-3 sm:col-start-5 sm:col-span-3 search-bar text-[#F7EF8A] mx-3">
          <input
            className="form-control w-full rounded-full p-2 bg-[#434343] placeholder-[#F7EF8A]"
            type="search"
            placeholder="Tìm kiếm..."
            aria-label="Search"
          />
        </form>

        <div className="xl:col-start-10 lg:col-start-10 md:col-start-9 sm:col-start-9 flex gap-1 xl:gap-10 lg:gap-4 md:gap-8 sm:gap-4 items-center">
          <img
            alt="svgImg"
            className="w-6 h-6"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAsMCwyNTYsMjU2IgpzdHlsZT0iZmlsbDojMDAwMDAwOyI+CjxnIGZpbGw9IiNmN2VmOGEiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxnIHRyYW5zZm9ybT0ic2NhbGUoNS4xMiw1LjEyKSI+PHBhdGggZD0iTTE2LDNjLTcuMTY3NTIsMCAtMTMsNS44MzI0OCAtMTMsMTN2MThjMCw3LjE2NzUyIDUuODMyNDgsMTMgMTMsMTNoMThjNy4xNjc1MiwwIDEzLC01LjgzMjQ4IDEzLC0xM3YtMThjMCwtNy4xNjc1MiAtNS44MzI0OCwtMTMgLTEzLC0xM3pNMTYsNWgxOGM2LjA4NjQ4LDAgMTEsNC45MTM1MiAxMSwxMXYxOGMwLDYuMDg2NDggLTQuOTEzNTIsMTEgLTExLDExaC0xOGMtNi4wODY0OCwwIC0xMSwtNC45MTM1MiAtMTEsLTExdi0xOGMwLC02LjA4NjQ4IDQuOTEzNTIsLTExIDExLC0xMXpNMzcsMTFjLTEuMTA0NTcsMCAtMiwwLjg5NTQzIC0yLDJjMCwxLjEwNDU3IDAuODk1NDMsMiAyLDJjMS4xMDQ1NywwIDIsLTAuODk1NDMgMiwtMmMwLC0xLjEwNDU3IC0wLjg5NTQzLC0yIC0yLC0yek0yNSwxNGMtNi4wNjMyOSwwIC0xMSw0LjkzNjcxIC0xMSwxMWMwLDYuMDYzMjkgNC45MzY3MSwxMSAxMSwxMWM2LjA2MzI5LDAgMTEsLTQuOTM2NzEgMTEsLTExYzAsLTYuMDYzMjkgLTQuOTM2NzEsLTExIC0xMSwtMTF6TTI1LDE2YzQuOTgyNDEsMCA5LDQuMDE3NTkgOSw5YzAsNC45ODI0MSAtNC4wMTc1OSw5IC05LDljLTQuOTgyNDEsMCAtOSwtNC4wMTc1OSAtOSwtOWMwLC00Ljk4MjQxIDQuMDE3NTksLTkgOSwtOXoiPjwvcGF0aD48L2c+PC9nPgo8L3N2Zz4="
          />
          <img
            alt="svgImg"
            className="w-6 h-6"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAsMCwyNTYsMjU2IgpzdHlsZT0iZmlsbDojMDAwMDAwOyI+CjxnIGZpbGw9IiNmN2VmOGEiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxnIHRyYW5zZm9ybT0ic2NhbGUoNS4xMiw1LjEyKSI+PHBhdGggZD0iTTI1LDNjLTEyLjEzODQ0LDAgLTIyLDkuODYxNTYgLTIyLDIyYzAsMTEuMDE5MTMgOC4xMjc1MywyMC4xMzgzNSAxOC43MTI4OSwyMS43Mjg1MmwxLjE0ODQ0LDAuMTczODN2LTE3LjMzNTk0aC01LjE5NzI3di0zLjUxOTUzaDUuMTk3Mjd2LTQuNjczODNjMCwtMi44NzgwOCAwLjY5MDY1LC00Ljc3MzYzIDEuODMzOTgsLTUuOTYyODljMS4xNDMzNCwtMS4xODkyNiAyLjgzMjY5LC0xLjc4OTA2IDUuMTgzNTksLTEuNzg5MDZjMS44Nzk4MSwwIDIuNjExMTIsMC4xMTM5IDMuMzA2NjQsMC4xOTkyMnYyLjg4MDg2aC0yLjQ0NzI3Yy0xLjM4ODU4LDAgLTIuNTI3ODMsMC43NzQ3MyAtMy4xMTkxNCwxLjgwNjY0Yy0wLjU5MTMxLDEuMDMxOTEgLTAuNzc1MzksMi4yNjQgLTAuNzc1MzksMy41MTk1M3Y0LjAxNzU4aDYuMTIzMDVsLTAuNTQ0OTIsMy41MTk1M2gtNS41NzgxMnYxNy4zNjUyM2wxLjEzNDc3LC0wLjE1NDNjMTAuNzM1ODIsLTEuNDU2MDIgMTkuMDIxNDgsLTEwLjY0ODU1IDE5LjAyMTQ4LC0yMS43NzUzOWMwLC0xMi4xMzg0NCAtOS44NjE1NiwtMjIgLTIyLC0yMnpNMjUsNWMxMS4wNTc1NiwwIDIwLDguOTQyNDQgMjAsMjBjMCw5LjcyOTc5IC02Ljk2NDIsMTcuNzMxOCAtMTYuMTU2MjUsMTkuNTMzMnYtMTIuOTY4NzVoNS4yOTI5N2wxLjE2MjExLC03LjUxOTUzaC02LjQ1NTA4di0yLjAxNzU4YzAsLTEuMDM3NDcgMC4xODk4MiwtMS45NjcwNSAwLjUwOTc3LC0yLjUyNTM5YzAuMzE5OTQsLTAuNTU4MzQgMC42MjgzNSwtMC44MDA3OCAxLjM4NDc3LC0wLjgwMDc4aDQuNDQ3Mjd2LTYuNjkxNDFsLTAuODY3MTksLTAuMTE3MTljLTAuNTk5NzksLTAuMDgxMTYgLTEuOTY5MTYsLTAuMjcxNDggLTQuNDM5NDUsLTAuMjcxNDhjLTIuNzAzMSwwIC01LjAyMzM0LDAuNzM2MzUgLTYuNjI1LDIuNDAyMzRjLTEuNjAxNjYsMS42NjU5OSAtMi4zOTI1OCw0LjE0NjY5IC0yLjM5MjU4LDcuMzQ5NjF2Mi42NzM4M2gtNS4xOTcyN3Y3LjUxOTUzaDUuMTk3Mjd2MTIuOTA0M2MtOS4wNDQzMywtMS45MTU4OSAtMTUuODYxMzMsLTkuODQ2MjYgLTE1Ljg2MTMzLC0xOS40NzA3YzAsLTExLjA1NzU2IDguOTQyNDQsLTIwIDIwLC0yMHoiPjwvcGF0aD48L2c+PC9nPgo8L3N2Zz4="
          />

          <Link to={"/cart"} className=" flex items-center">
            <span>GIỎ HÀNG</span>
            <img
              className="w-6 h-6 "
              alt=""
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADR0lEQVR4nO2Zy2sUQRCHSw0oInrVRBEf0fgAEfHiP6AioidvQgxJNCIiAcHbnjTTNRshInjwoGI00SAiUTx5UI/iyYuCEEiMuu5M1yxmuycR09IzvVEkL5Oe2R3wg77sbtf0b7uquqoH4D81RsjdI5LYJ0moZhqCM5KEryRhs1JqCdQiknB0NhHTjN6aFCMJR34vkg3//b1edLnI6iVhmyD8bnboJNQaoe8ejsWwYenjodl+KwPWHgnm+BayjFI9yyVHT4sJPWcHZBlJ2Gt2pQOyjCRsM0L6IcuEpfy2WAgr1GT2WkjKDov5JsgykvB+tCs+OwNZRgZ42pw7fZBlwmK+yQj58j9OagXJsf8fa7QkxmsbQjqqLURw9nHRQkLP3VmJE0gZSXg7FoK5RRvTQS45fo3OkxLbbmWF80AVcqt0FS44m5RB12awgeQ4EO1KwNqtGJwHkliLcasXYAvJnXPGve5ZMzoHOsCt90TjvrvbCPkMKRCWWKN2KUGspEZzK60ZjuOEFUycNELCSMLLJshv2jfO8ZHZlVZIEKVyS6MuVgvxnQPWHxBy97wRchcSRAbOQRMbHxIpi8Z51x5zQI1ACpWE4HgpkQeY8yTq42WAWxJ5BnfWCGJCcPwp/PwGSArJ8bFxr5Zk7LOz0W4Qew5JUia8YITcScK+5PgmEhK4JyBJxii/d6YLvsUy7ju7zB2Br4ZyKyDx1MiZH4txN9m0LTnrNm51HdJAED4x2avZlk2lcnW6utZ2y0F+H6SBIOw0ef6WLZshx2NmN95BWuh/zOT5IdvZUBB2Qloo9XCZeY9iuQvEH2MFXAtpIggHLbeyk4LYtVRFxELYReMKNyDLlAN3v3GH95BllMrV6aYnSpdFVg9ZRkydJ84pyDKSWKspV15CllFez+qpcoWjI7i7UadmyCJlYscFZxP2UjGr3u6G3D1q8TyZGPt2dV1VhOjexJwpg2Wvu0EPQezpbO9VJLG+medgb/oq4kXFVavX3VD5TLepld5i2jk8jq3p5gjCAKrB1HniOevnuyixgDmJU7nv0q6hF6aHIHxmstmArTnpvMau3K78ObT7BFe22poDaaB9XXL2QLtM5Db69n6OBS1kjuYXKOSft6HRrUkAAAAASUVORK5CYII="
            ></img>
          </Link>
        </div>
        <div className=" col-start-12 sm:col-start-11 lg:col-start-12 xl:col-start-12">
          {user ? (
            <div className="flex items-center gap-2">
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-[#F7EF8A]"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span>{user.username}</span>
              <button onClick={handleLogout} className="text-[#F7EF8A]">
                ĐĂNG XUẤT
              </button>
            </div>
          ) : (
            <Link to={"/login"} className="text-[#F7EF8A] mr-4">
              ĐĂNG NHẬP
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
