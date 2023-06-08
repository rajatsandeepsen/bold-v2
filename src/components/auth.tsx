import { Button } from "../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"

const Auth = () => {


    return ( 
        <article>
            <Tabs defaultValue="login" className="w-[400px] mx-auto">
            <TabsList className="grid w-full grid-cols-2 h-auto">
                <TabsTrigger className="py-3" value="login">Login</TabsTrigger>
                <TabsTrigger className="py-3" value="signup">Sign-up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
                <Card>
                <form>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        Login to your Account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input required={true} className=" required:valid:bg-slate-100" autoComplete="username" name="email" type="email" placeholder="user@example.com" />
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input required={true} className=" required:valid:bg-slate-100" autoComplete="current-password" type="password" name="password" placeholder="**** ****" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Login</Button>
                </CardFooter>
                </form>
                </Card>
            </TabsContent>

            <TabsContent value="signup">
                <Card>
                <form>
                <CardHeader>
                    <CardTitle>Signup</CardTitle>
                    <CardDescription>
                        Create you Account here.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                    <Label htmlFor="newEmail">Email</Label>
                    <Input required={true} className=" required:valid:bg-slate-100" autoComplete="username" name="newEmail" placeholder="user@example.com" type="email" />
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="newPassword">Password</Label>
                    <Input required={true} className=" required:valid:bg-slate-100" autoComplete="new-password" name="newPassword" placeholder="**** ****" type="password" />
                    </div>
                    <div className="space-y-1">
                    {/* <Label htmlFor="newPassword">Password</Label> */}
                    <Input required={true} className=" required:valid:bg-slate-100" autoComplete="new-password" name="newPasswordConfirm" placeholder="Password confirm" type="password" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Create</Button>
                </CardFooter>
                </form>
                </Card>
            </TabsContent>
            </Tabs>
        </article>
     );
}
 
export default Auth;