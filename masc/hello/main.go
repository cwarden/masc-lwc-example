//go:build !dev
// +build !dev

package main

import (
	"syscall/js"

	"github.com/octoberswimmer/masc"

	"github.com/octoberswimmer/masc/example/todomvc/components"
)

func main() {
	masc.SetTitle("Hello masc!")
	masc.AddStylesheet("https://rawgit.com/tastejs/todomvc-common/master/base.css")
	masc.AddStylesheet("https://rawgit.com/tastejs/todomvc-app-css/master/index.css")

	m := &components.PageView{}
	js.Global().Set("startWithDiv", JsStartFunc(m))
	select {}
}

func JsStartFunc(m masc.Model) js.Func {
	return js.FuncOf(func(this js.Value, inputs []js.Value) any {
		node := inputs[0]
		teaOptions := []masc.ProgramOption{masc.RenderTo(node)}
		pgm := masc.NewProgram(m, teaOptions...)

		go func() {
			_, err := pgm.Run()
			if err != nil {
				panic(err)
			}
		}()
		return nil
	})
}
